import AdminTitle from '@/admin/components/AdminTitle'
import { Button } from '@/components/ui/button'
import {
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from '@/components/ui/table'
import { currencyFormatter } from '@/lib/currencyFormatter'
import { Pagination } from '@/shop/components/Pagination'
import { useProducts } from '@/shop/hooks/useProducts'
import { PencilIcon, PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

const AdminProductPage = () => {
    const { data } = useProducts()

    return (
        <>
            <div className="flex justify-between items-center">
                <AdminTitle
                    title="Products"
                    subtitle="Here you can see the products"
                ></AdminTitle>

                <div className="flex justify-end mb-10 gap-4">
                    <Link to="/admin/products/new">
                        <Button>
                            <PlusIcon></PlusIcon>
                            Nuevo Producto
                        </Button>
                    </Link>
                </div>
            </div>

            <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        {/* <TableHead className="w-[100px]">ID</TableHead> */}
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Inventario</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.products.map((product) => {
                        return (
                            <TableRow key={product.id}>
                                {/* <TableCell className="font-medium">
                                    {product.id}
                                </TableCell> */}
                                <TableCell>
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded-md"
                                    ></img>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        className="hover:text-blue-500 underline"
                                        to={`/admin/products/${product.id}`}
                                    >
                                        {product.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {currencyFormatter(product.price)}
                                </TableCell>
                                <TableCell>{product.gender}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    {product.sizes.join(', ')}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link to={`/admin/products/${product.id}`}>
                                        <PencilIcon className="w-4 h-4 text-blue-500"></PencilIcon>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <Pagination totalPages={data?.pages || 0}></Pagination>
        </>
    )
}

export default AdminProductPage
