import { tesloAPI } from '@/api/teslo-api'
import type { ProductsResponse } from '@/types/products.response'

interface Options {
    limit?: string | number
    offset?: string | number
    sizes?: string
    gender?: string
    minPrice?: number
    maxPrice?: number
    query?: string
}

const getProductAction = async (
    options: Options
): Promise<ProductsResponse> => {
    const { limit, offset, gender, sizes, minPrice, maxPrice, query } = options

    const { data } = await tesloAPI.get<ProductsResponse>('/products', {
        params: {
            limit,
            offset,
            gender,
            sizes,
            minPrice,
            maxPrice,
            q: query,
        },
    })

    const productWithImageURLs = data.products.map((product) => ({
        ...product,
        images: product.images.map(
            (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
        ),
    }))

    return {
        ...data,
        products: productWithImageURLs,
    }
}

export { getProductAction }
