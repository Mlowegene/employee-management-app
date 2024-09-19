import { createContext, useContext, useState, useEffect } from "react"
import axios from 'axios'
const userContext = createContext()

function authContext({children}) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const VerifyUser = async () => {
        try {
          const token = localStorage.getItem('token')
          if(token){
            const response = await axios.get('http://localhost:5000/api/auth/verify',{
              header: {
                "Authorization": `Bearer ${token}`
              }
            })
            if(response.data.success) {
              setUser(response.data.user)
            }
          }else {
            setUser(null)
          }
          
        } catch (error) {
          if(error.response && !error.response.data.error) {
            setUser(null)
          }
        }finally {
          setLoading(false)
        }
      }
      VerifyUser()
    }, [])
    

    const Login = (user) => {
        setUser(user)
    }

    const Logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }

  return (
    <userContext.Provider value={{Login, Logout, user, loading}}>
      {children}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext)

export default authContext