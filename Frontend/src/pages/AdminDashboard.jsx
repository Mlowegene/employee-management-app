import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

function AdminDashboard() {
  const {user, loading} = useAuth()
  const navigate = useNavigate()

  if(loading) {
    return <div>Loading...</div>
  }
  if(!user) {
    navigate('/login')
  }
  return (
    <div> admin</div>
  )
}

export default AdminDashboard
