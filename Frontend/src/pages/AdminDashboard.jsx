import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import AdminSidebar from "../components/dashboard/AdminSidebar"

function AdminDashboard() {
  const {user} = useAuth()

  return (
    <div>
      <AdminSidebar />
    </div>
  )
}

export default AdminDashboard
