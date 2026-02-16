// https://github.com/Klerith/bolt-product-editor
import { Navigate, useNavigate, useParams } from 'react-router'

import { useProduct } from '@/admin/hooks/useProduct'
import { ProductForm } from './ui/ProductForm'
import type { Product } from '@/types/product.interface'
import { toast } from 'sonner'

const AdminProductPage = () => {
    const { productId: id } = useParams()

    const navigate = useNavigate()

    const { isLoading, isError, data: product, mutation } = useProduct(id || '')

    const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto'
    const productSubtitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.'

    const handleSubmitForm = async (
        productLike: Partial<Product> & { files?: File[] }
    ) => {
        await mutation.mutateAsync(productLike, {
            onSuccess: (data) => {
                toast.success('Producto actualizado correctamente!', {
                    position: 'top-right',
                })

                navigate(`/admin/products/${data.id}`)
            },
            onError: (error) => {
                console.log(error)
                toast.error('Error al actualizar el producto')
            },
        })
    }

    if (isError) return <Navigate to={'/admin/products'}></Navigate>

    if (isLoading) return <h1>Loading...</h1>

    if (!product) return <Navigate to={'/admin/products'}></Navigate>

    return (
        <ProductForm
            title={productTitle}
            subtitle={productSubtitle}
            product={product}
            onSubmit={handleSubmitForm}
            isPending={mutation.isPending}
        ></ProductForm>
    )
}

export default AdminProductPage
