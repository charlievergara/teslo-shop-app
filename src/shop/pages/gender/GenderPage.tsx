import Jumbotron from '@/shop/components/Jumbotron'
import { Pagination } from '@/shop/components/Pagination'
import ProductGrid from '@/shop/components/ProductGrid'
import { useProducts } from '@/shop/hooks/useProducts'
import { useParams } from 'react-router'

const GenderPage = () => {
    const { gender } = useParams()

    const { data } = useProducts()

    const genderLabel =
        gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : 'Niños'
    return (
        <>
            <Jumbotron title={genderLabel}></Jumbotron>

            <ProductGrid products={data?.products || []}></ProductGrid>

            <Pagination totalPages={data?.pages || 0}></Pagination>
        </>
    )
}

export default GenderPage
