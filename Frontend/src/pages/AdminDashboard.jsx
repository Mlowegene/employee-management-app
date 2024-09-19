import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

function AdminDashboard() {
  const {user} = useAuth()

  return (
    <div> admin</div>
  )
}

export default AdminDashboard
