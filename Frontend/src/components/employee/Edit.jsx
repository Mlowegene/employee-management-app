import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { fetchDepartment } from "../../utils/EmployeeHelpers"


function Edit() {
    const {id} = useParams();
    const [employee, setEmployee] = useState({
        name: '',
        martialStatus: '',
        designation: '',
        department: '',
        salary: 0,
        
    })
    const [departments, setDepartments] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getDepartments = async () => {
            const EmpDepartments = await fetchDepartment()
            setDepartments(EmpDepartments)
    }
    getDepartments()
    }, [])

    useEffect(() => {
        const fetchEmployee = async () => {
            
            try {
                const response = await axios.get(`https://employee-management-api-one-iota.vercel.app/api/employee/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })  
                
                
                if(response.data.success) {
                    const employee = response.data.employee;
                    setEmployee((prev) => ({
                        ...prev, 
                        name: employee.userId.name, 
                        martialStatus: employee.martialStatus,
                        designation: employee.designation,
                        department: employee.department,
                        salary: employee.salary,  
                    }))
                }
            } catch (error) {
                if(error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            }
          };
    fetchEmployee()
    }, [])  
    
    
    const handleChange = (e) => {
        const {name, value } = e.target; 
        setEmployee((prev) => ({...prev, [name] : value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.put(`https://employee-management-api-one-iota.vercel.app/api/employee/${id}`, employee, {
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("token")}`
                }
            })
            
            if(response.data.success) {
                navigate('/admin-dashboard/employees')
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                console.log(error.response.data.error)
                
            }
        }
    }

  return (
    <>{departments && employee ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Enter name" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Martial Status</label>
                <select name="martialStatus" value={employee.martialStatus} onChange={handleChange} placeholder="Martial Status" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required >
                    <option value="">Select Status</option>
                    <option value="male">Single</option>
                    <option value="female">Married</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <input type="text" name="designation" value={employee.designation} onChange={handleChange} placeholder="Designation" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input type="number" name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select name="department" value={employee.department} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required >
                    <option value="">Select Department</option>
                    {departments.map(dep =>(
                        <option value={dep._id} key={dep._id}>{dep.dep_name}</option>
                    ) )}
                </select>
            </div>
        </div>
        <button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md">Edit Employee</button>
      </form>
    </div>
    ) : <div className="flex items-center justify-center h-screen">
            <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <div className="text-blue-500">Loading...</div>
             </div>
         </div>
    }</>
  )
}

export default Edit

