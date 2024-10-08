import { useAuth } from "../../context/authContext"

useAuth
function Navbar() {

    const {user, Logout} = useAuth()
  return (
    <div className="flex items-center text-white justify-between h-12 bg-blue-600 px-5">
      <p>Welcome {user.name}</p>
      <button className="px-4 py-1 bg-blue-700 hover:bg-blue-800" onClick={Logout}>logout</button>
    </div>
  ) 
}

export default Navbar

