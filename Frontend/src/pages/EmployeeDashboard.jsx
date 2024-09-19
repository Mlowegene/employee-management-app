import { useAuth } from "../context/authContext.jsx"

function EmployeeDashboard() {

    const {user} = useAuth()
  return (
    <div>
      employee{user.name}
    </div>
  )
}

export default EmployeeDashboard
