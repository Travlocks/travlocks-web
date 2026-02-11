declare namespace kakao.maps {
  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    setLevel(level: number): void;
    getCenter(): LatLng;
    getLevel(): number;
  }

  interface MapOptions {
    center: LatLng;
    level?: number;
  }

  function load(callback: () => void): void;

  namespace services {
    class Places {
      keywordSearch(
        keyword: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: (result: any[], status: Status, pagination: any) => void,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options?: any,
      ): void;
    }

    enum Status {
      OK = 'OK',
      ZERO_RESULT = 'ZERO_RESULT',
      ERROR = 'ERROR',
    }
  }
}

interface Window {
  kakao: typeof kakao;
}
