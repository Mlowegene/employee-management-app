import { Link } from "react-router-dom"


function List() {
  return (
    <div className="p-5">
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employee</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder="Search by dept name..." className='px-4 py-0.5 border' />
        <Link to="/admin-dashboard/add-employee" className='px-4 py-1 bg-teal-400 rounded text-white'>Add New Employee</Link>
      </div>
    </div>
  )
}

export default List 