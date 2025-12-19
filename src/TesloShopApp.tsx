import { RouterProvider } from 'react-router'
import { appRouter } from './router/app.router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'

import { Toaster } from 'sonner'
import type { PropsWithChildren } from 'react'
import { useAuthStore } from './auth/store/auth.store'

const queryClient = new QueryClient()

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
    const { checkAuthStatus } = useAuthStore()

    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false,
        refetchInterval: 1000 * 60 * 1.5,
    })

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return children
}

export const TesloShopApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* The rest of your application */}
            <Toaster></Toaster>
            <CheckAuthProvider>
                <RouterProvider router={appRouter}></RouterProvider>
            </CheckAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
