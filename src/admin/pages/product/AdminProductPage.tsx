// https://github.com/Klerith/bolt-product-editor

import AdminTitle from '@/admin/components/AdminTitle'
import { Navigate, useParams } from 'react-router'

import { useState } from 'react'
import { X, Plus, Upload, Tag, SaveAll } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { useProduct } from '@/admin/hooks/useProduct'
import { ProductForm } from './ui/ProductForm'

interface Product {
    id: string
    title: string
    price: number
    description: string
    slug: string
    stock: number
    sizes: string[]
    gender: string
    tags: string[]
    images: string[]
}

const AdminProductPage = () => {
    const { productId: id } = useParams()

    const { isLoading, isError, data: product } = useProduct(id || '')

    const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto'
    const productSubtitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.'

    if (isError) return <Navigate to={'/admin/products'}></Navigate>

    if (isLoading) return <h1>Loading...</h1>

    if (!product) return <Navigate to={'/admin/products'}></Navigate>

    return (
        <ProductForm
            title={productTitle}
            subtitle={productSubtitle}
            product={product}
        ></ProductForm>
    )
}

export default AdminProductPage
