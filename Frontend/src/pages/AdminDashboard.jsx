import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import AdminSidebar from "../components/dashboard/AdminSidebar"
import Navbar from "../components/dashboard/Navbar"
import AdminSummary from "../components/dashboard/AdminSummary"

function AdminDashboard() {
  const {user} = useAuth()

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <AdminSummary />
      </div>
    </div>
  )
}

export default AdminDashboard
