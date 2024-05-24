import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react'
import ProManag from './ProManag';

function ProgramsProvider() {
    const queryClient = new QueryClient();
  return (
  
      <QueryClientProvider client={queryClient}>
        <ProManag />
      </QueryClientProvider>
    );
  
}

export default ProgramsProvider