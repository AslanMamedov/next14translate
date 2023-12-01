'use client';
import React, { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

interface TansTackQueryProviderProps {}
const TansTackQueryProvider: FC<PropsWithChildren<TansTackQueryProviderProps>> = ({ children }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TansTackQueryProvider;
