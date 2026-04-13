import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import type { ComponentType } from 'react';

export function withMemoryRouter(initialPath = '/') {
  return function MemoryRouterDecorator(Story: ComponentType) {
    return (
      <MemoryRouter initialEntries={[initialPath]}>
        <Story />
      </MemoryRouter>
    );
  };
}

export function withQueryAndRouter(initialPath = '/') {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return function QueryRouterDecorator(Story: ComponentType) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Story />
        </MemoryRouter>
      </QueryClientProvider>
    );
  };
}
