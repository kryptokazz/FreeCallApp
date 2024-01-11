// main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    <ReactQueryDevtools /> 
  </React.StrictMode>
);

