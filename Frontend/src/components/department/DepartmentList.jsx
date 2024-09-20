import {Link} from 'react-router-dom'
function DepartmentList() {
  return (
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>MAnage Department</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder="Search by dept name..." className='px-4 py-0.5 border' />
        <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-teal-400 rounded text-white'>Add New Department</Link>
      </div>
    </div>
  )
}Ff

export default DepartmentList
