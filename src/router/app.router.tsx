import { createBrowserRouter, Navigate } from 'react-router'
import { ShopLayout } from '../shop/layouts/ShopLayout'
import HomePage from '../shop/pages/home/HomePage'
import ProductPage from '../shop/pages/product/ProductPage'
import GenderPage from '../shop/pages/gender/GenderPage'
import LoginPage from '../auth/pages/login/LoginPage'
import RegisterPage from '../auth/pages/register/RegisterPage'
import DashboardPage from '../admin/pages/dashboard/DashboardPage'
import AdminProductPage from '../admin/pages/product/AdminProductPage'
import AdminProductsPage from '../admin/pages/products/AdminProductsPage'
import { lazy } from 'react'
import {
    AdminRoute,
    NotAuthenticatedRoute,
} from '@/components/routes/ProtectedRoutes'

const AuthLayout = lazy(() => import('../auth/layouts/AuthLayout'))
const AdminLayout = lazy(() => import('../admin/layouts/AdminLayout'))

export const appRouter = createBrowserRouter([
    //public routes
    {
        path: '/',
        element: <ShopLayout></ShopLayout>,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>,
            },
            {
                path: 'product/:slugId',
                element: <ProductPage></ProductPage>,
            },
            {
                path: 'gender/:gender',
                element: <GenderPage></GenderPage>,
            },
        ],
    },
    //Auth Routes
    {
        path: '/auth',
        element: (
            <NotAuthenticatedRoute>
                <AuthLayout></AuthLayout>
            </NotAuthenticatedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login"></Navigate>,
            },
            {
                path: 'login',
                element: <LoginPage></LoginPage>,
            },
            {
                path: 'register',
                element: <RegisterPage></RegisterPage>,
            },
        ],
    },
    //Admin Routes
    {
        path: '/admin',
        element: (
            <AdminRoute>
                <AdminLayout></AdminLayout>
            </AdminRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage></DashboardPage>,
            },
            {
                path: 'products',
                element: <AdminProductsPage></AdminProductsPage>,
            },
            {
                path: 'products/:productId',
                element: <AdminProductPage></AdminProductPage>,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to={'/'}></Navigate>,
    },
])
