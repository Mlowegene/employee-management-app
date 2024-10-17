import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import DataTable from 'react-data-table-component'
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelpers";


function List() {

    const [employees, setEmployees] = useState({})
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredEmployee, setFilteredEmployee] = useState([])

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true)
          try {
              const response = await axios.get('http://localhost:5000/api/employee', {
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
              })
              
              if(response.data.success) {
                  let sno = 1;
                  const data = await response.data.employees.map((emp)=> (
                      {
                          _id: emp._id,
                          sno: sno++,
                          dep_name: emp.department.dep_name,
                          name: emp.userId.name,
                          dob: new Date(emp.dob).toLocaleDateString(),
                          profileImage: <img width={40} className="rounded-full" src={`http://localhost:5000/${emp.userId.profileImage}`} />,
                          action: (<EmployeeButtons Id={emp._id} />)
                      }
                  ))
                  setEmployees(data)
                  setFilteredEmployee(data)
              }
          } catch (error) {
              if(error.response && !error.response.data.success) {
                  alert(error.response.data.error)
              }
          }finally{
            setEmpLoading(false)
          }
        };
    
        fetchEmployees()
      }, [])

      const handleFilter = (e) => {
          const records = employees.filter((emp) => (
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
          ))
          setFilteredEmployee(records)
      }

  return (
    <>
    {empLoading ? 
        <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <div className="text-blue-500">Loading...</div>
        </div>
      </div>
      : 
    <div className="p-5">
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employee</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" onChange={handleFilter} placeholder="Search by employee name..." className='px-4 py-0.5 border' />
        <Link to="/admin-dashboard/add-employee" className='px-4 py-1 bg-teal-400 rounded text-white'>Add New Employee</Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredEmployee} pagination />
      </div>
    </div>
}
</>
  )
}

export default List 
