import { useEffect, useState } from "react"
import { fetchDepartment } from "../../utils/EmployeeHelpers"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function Add() {
    const [departments, setDepartments] = useState([])
    const [employeeData, setEmployeeData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const getDepartments = async () => {
        const EmpDepartments = await fetchDepartment()
        setDepartments(EmpDepartments)
    }
    getDepartments()
    }, [])
    
    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if(name === "image"){
            setEmployeeData((prev) => ({...prev, [name] : files[0]}))
        } else {
            setEmployeeData((prev) => ({...prev, [name] : value}))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const employeeDataObj = new FormData()
        Object.keys(employeeData).forEach((key) =>{
            employeeDataObj.append(key, employeeData[key])
        })

        try {
            const response = await axios.post('http://localhost:5000/api/employee/add', employeeDataObj , {
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("token")}`
                }
            })
            
            if(response.data.success) {
                navigate('/admin-dashboard/employees')
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" onChange={handleChange} placeholder="Enter name" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                <input type="text" name="employeeId" onChange={handleChange} placeholder="Employee ID" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input type="date" name="dob" onChange={handleChange} placeholder="DOB" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select name="gender" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required >
                    <option value="">Select Gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Martial Status</label>
                <select name="martialStatus" onChange={handleChange} placeholder="Martial Status" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required >
                    <option value="">Select Status</option>
                    <option value="male">Single</option>
                    <option value="female">Married</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <input type="text" name="designation" onChange={handleChange} placeholder="Designation" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select name="department" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required >
                    <option value="">Select Department</option>
                    {departments.map(dep =>(
                        <option value={dep._id} key={dep._id}>{dep.dep_name}</option>
                    ) )}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input type="number" name="salary" onChange={handleChange} placeholder="Salary" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" onChange={handleChange} placeholder="*****" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select name="role" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                <input type="file" name="image" onChange={handleChange} placeholder="Upload image" accept="image/*" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
            </div>
        </div>
        <button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md">Add Employee</button>
      </form>
    </div>
  )
}

export default Add
