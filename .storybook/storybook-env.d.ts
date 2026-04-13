import '@storybook/react-vite';

declare module '@storybook/react-vite' {
  interface Parameters {
    /** 전역 데코레이터 `MemoryRouter`의 `initialEntries` (기본 `['/']`). */
    memoryRouter?: { initialEntries?: string[] };
  }
}
