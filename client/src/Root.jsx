import { Outlet } from "react-router-dom"

import TopNavbar from "./subcomponents/TopNavbar"
import BottomNavbar from "./subcomponents/BottomNavbar"



export default function Root() {

  return(
    <>
      <TopNavbar />
      <main>
        <Outlet />
      </main>
      <BottomNavbar />
    </>
  )
}
