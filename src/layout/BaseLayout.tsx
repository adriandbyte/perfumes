import React, { PropsWithChildren } from "react"
import LiNavLink from "../components/LiNavLink/LiNavLink"
import LiCloseSessionBtn from "../components/LiCloseSessionBtn/LiCloseSessionBtn"
import SidebarToggleBtn from "../components/SidebarToggleBtn/SidebarToggleBtn"
import SidebarBrand from "../components/SidebarBrand/SidebarBrand"
import DropDownMenuLink from "../components/DropdownMenuLink/DropdownMenuLink"

type BaseLayoutProps = PropsWithChildren<{ title?: string }>

export default function BaseLayout({ children }: BaseLayoutProps) {
  const [show, setShow] = React.useState(false)

  const toggleResponsive = () => setShow(!show)

  return (
    <div className="relative min-h-screen md:flex">
      <div className="bg-primary text-gray-100 flex justify-between md:hidden">
        <LiNavLink to="/">
          <SidebarBrand />
        </LiNavLink>
        <SidebarToggleBtn onClick={toggleResponsive} />
      </div>

      <div
        className={`sidebar bg-primary z-10	text-white  py-7 px-2 space-y-4 absolute md:relative md:translate-x-0 inset-y-0 left-0 transform ${
          show && "-translate-x-full"
        } transition duration-200 ease-in-out`}
      >
        <LiNavLink to="/">
          <SidebarBrand />
        </LiNavLink>

        <nav className="py-4">
          <LiNavLink to="/categories">Categorias</LiNavLink>
          <LiNavLink to="/suppliers">Provedores</LiNavLink>
          <DropDownMenuLink />
          <LiCloseSessionBtn />
        </nav>
      </div>

      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}
