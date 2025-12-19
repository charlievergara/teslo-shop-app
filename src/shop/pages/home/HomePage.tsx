import Jumbotron from '@/shop/components/Jumbotron'
import { Pagination } from '@/shop/components/Pagination'
import ProductGrid from '@/shop/components/ProductGrid'
import { useProducts } from '@/shop/hooks/useProducts'

const HomePage = () => {
    const { data } = useProducts()

    return (
        <>
            <Jumbotron title="Todos los productos"></Jumbotron>

            <ProductGrid products={data?.products || []}></ProductGrid>

            <Pagination totalPages={data?.pages || 0}></Pagination>
        </>
    )
}

export default HomePage
