import { Outlet } from "react-router"
import ShopHeader from "../components/ShopHeader"
import ShopFooter from "../components/ShopFooter"

export const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">

        <ShopHeader></ShopHeader>

        <Outlet></Outlet>

        <ShopFooter></ShopFooter>
    </div>
  )
}
