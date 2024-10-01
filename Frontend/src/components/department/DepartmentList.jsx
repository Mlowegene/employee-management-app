import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelpers'
import axios from 'axios'
import { useState, useEffect } from 'react'
function DepartmentList() {
 
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)

  const onDepartmentDelete = async (id) => {
    const data = departments.filter(dep => dep._id !== id)
    setDepartments(data)
  }

    useEffect(() => {
      const fetchDepartment = async () => {

        setDepLoading(true)
        try {
            const response = await axios.get('http://localhost/api/department', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                let sno = 1;
                const data = await response.data.departments.map((dep)=> (
                    {
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
                    }
                ))
                setDepartments(data)
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }finally{
            setDepLoading(false)
        }
      };

      fetchDepartment()
    }, [])
    

  return (
    <>
    {depLoading ? <div>Loading...</div> : 
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>MAnage Department</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder="Search by dept name..." className='px-4 py-0.5 border' />
        <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-teal-400 rounded text-white'>Add New Department</Link>
      </div>
      <div className='mt-5'>
        <DataTable columns={columns} data={departments} />
      </div>
    </div>
    }
    </>
  )
}

export default DepartmentList
