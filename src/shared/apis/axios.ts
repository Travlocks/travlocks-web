import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { postRefreshToken } from '@/feature/auth/login/apis/login';
import { useAuthStore } from '@/shared/stores/authStore';

// 토큰 갱신 로직 건너뛰기 플래그 타입
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipTokenRefresh?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

let isRefreshing = false;

// 레이스 컨디션 방지를 위한 대기 큐
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

// 대기 중인 요청들 처리
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// 메모리 기반 토큰 가져오기
const getAccessToken = (): string | null => {
  return useAuthStore.getState().actions.getAccessToken();
};

// 메모리 기반 토큰 설정
const setAccessToken = (token: string | null): void => {
  useAuthStore.getState().actions.setAccessToken(token);
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // 오류 요청 원본 복사
    const originalRequest = error.config as CustomAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      // 토큰 갱신 로직 건너뛰기 플래그
      if (originalRequest.skipTokenRefresh) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await postRefreshToken();
        const newAccessToken = data.accessToken;

        // 메모리 기반 저장 (XSS 방지)
        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        setAccessToken(null);
        useAuthStore.getState().actions.logout();

        window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
