import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useAuth } from "../../context/authContext";


let empLoading = false;
const LeavesList = () => {
  const { id } = useParams();
  const {user} = useAuth();
  const [leaves, setLeaves] = useState([]);

  let sno = 1;

  const fetchLeaves = async () => {
      try {
         const response = await axios.get(`https://employee-management-api-one-iota.vercel.app/api/leave/${user._id}/${user.role}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
         });
         
         if(response.data.success){
              setLeaves(response.data.leaves)
         }
      } catch (error) {
          if(error.response && !error.response.data.success){
              console.log(error)
          }
      }
  }
  
   useEffect(()=> {
    fetchLeaves()
   }, [])


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
        <h3 className='text-2xl font-bold'>Manage Leaves</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" onChange={()=>{}} placeholder="Search by employee name..." className='px-4 py-0.5 border' />
        <Link to="/employee-dashboard/add-leave" className='px-4 py-1 bg-teal-400 rounded text-white'>Add New Leave</Link>
      </div>
      <div className="mt-6">
      <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 border border-gray-200">
                      <tr>
                        <th className="px-6 py-3">SNO</th>
                        <th className="px-6 py-3">LEAVE TYPE</th>
                        <th className="px-6 py-3">FROM</th>
                        <th className="px-6 py-3">TO</th>
                        <th className="px-6 py-3">DESCRIPTION</th>
                        <th className="px-6 py-3">APPLIED DATE</th>
                        <th className="px-6 py-3">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave)=> (
                            <tr
                            key={leave._id}
                            className="bg-white border-b dark:border-gray-700"
                            >
                                <td className="px-6 py-3">{sno++}</td>
                                <td className="px-6 py-3">{leave.leaveType}</td>
                                <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{leave.reason}</td>
                                <td className="px-6 py-3">{new Date(leave.appliedAt).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
      </div>
    </div>
}
</>
  )
}

export default LeavesList

