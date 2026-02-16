import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProductByIdAction } from '../actions/getProductById.action'
import type { Product } from '@/types/product.interface'
import { createUpdateProductAction } from '../actions/create-update-product.action'

export const useProduct = (id: string) => {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5,
    })

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({
                queryKey: ['product', { id: product.id }],
            })
            queryClient.setQueryData(['product', { id: product.id }], product)
        },
    })

    //manejar la mutation
    // const handleSubmitForm = async (productLike: Partial<Product>) => {
    //     console.log(productLike)
    // }

    return {
        ...query,
        mutation,
    }
}
