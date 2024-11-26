import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { fetchDepartment, getEmployees } from "../../utils/EmployeeHelpers"


function Add() {
    const [salary, setSalary] = useState({
        employeeId: '',
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
        
    })
    const [departments, setDepartments] = useState(null)
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getDepartments = async () => {
            const EmpDepartments = await fetchDepartment()
            setDepartments(EmpDepartments)
    }
    getDepartments()
    }, []) 
    
    const handleChange = (e) => {
        const {name, value } = e.target; 
        setSalary((prev) => ({...prev, [name] : value}))
    }

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value)
        setEmployees(emps)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`https://employee-management-api-one-iota.vercel.app/api/salary/add`, salary, {
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
    <>{departments && salary ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select name="department" onChange={handleDepartment} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required >
                    <option value="">Select Department</option>
                    {departments.map(dep =>(
                        <option value={dep._id} key={dep._id}>{dep.dep_name}</option>
                    ) )}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Employee</label>
                <select name="employeeId" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required >
                    <option value="">Select Employee </option>
                    {employees.map(emp =>(
                        <option value={emp._id} key={emp._id}>{emp.employeeId}</option>
                    ) )}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
                <input type="number" name="basicSalary" onChange={handleChange} placeholder="Basic Salary" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Allowances</label>
                <input type="number" name="allowances" onChange={handleChange} placeholder="Allowances" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Deductions</label>
                <input type="number" name="deductions" onChange={handleChange} placeholder="Deductions" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Pay Date</label>
                <input type="date" name="payDate" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
            </div>
        </div>
        <button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md">Add Salary</button>
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

export default Add

