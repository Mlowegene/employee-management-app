import SideBar from "../components/employeeDashboard/SideBar"
import {Outlet} from "react-router-dom"
import NavBar from "../components/dashboard/Navbar"
import Summary from "../components/employeeDashboard/Summary"

function EmployeeDashboard() {

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <NavBar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard
