import { axiosInstance } from '@/shared/apis/axios';

export const putFavorite = async (templateId: number): Promise<void> => {
  try {
    await axiosInstance.put(`/templates/${templateId}/favorite`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFavorite = async (templateId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/templates/${templateId}/favorite`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
