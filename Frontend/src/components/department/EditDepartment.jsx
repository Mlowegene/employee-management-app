import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

function EditDepartment() {
    const {id} = useParams();
    const [department, setDepartment] = useState([])
    const [depLoading, setDepLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
  
          setDepLoading(true)
          try {
              const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
              })
              if(response.data.success) {
                  setDepartment(response.data.department)
              }
          } catch (error) {
              if(error.response && !error.response.data.success) {
                  console.log(error.response.data.error)
              }
          }finally{
              setDepLoading(false)
          }
        };
  
        fetchDepartment()
      }, [])

      const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name]: value})
    }

    const handleSubmit =async (e) => {
        
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("token")}`
                }
            })
            
            if(response.data.success) {
                navigate('/admin-dashboard/departments')
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

  return (
    <>{depLoading ? 
        <div className="flex items-center justify-center h-screen">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <div className="text-blue-500">Loading...</div>
          </div>
        </div>
        : 
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <div className="text-2xl font-bold mb-6">
        <h3>Edit Department</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="dep_name" className="text-sm text-gray-700 ">Department Name</label>
                <input type="text" name="dep_name" value={department.dep_name} onChange={handleChange} placeholder="Enter Dep Name" className="mt-1 font-normal text-sm w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
            <label htmlFor="description" className="text-sm text-gray-700 ">Description</label>
            <textarea name="description" onChange={handleChange} value={department.description} placeholder="description" className="mt-1 font-normal text-sm w-full p-2 border border-gray-300 rounded-md" rows="4"></textarea>
            </div>
            <button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded">Edit Department</button>
        </form>
      </div>
    </div>
    }
    </>
  )
}

export default EditDepartment
