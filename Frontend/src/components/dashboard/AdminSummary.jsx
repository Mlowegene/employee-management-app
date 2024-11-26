import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa"
import SummaryCard from './SummaryCard'
import { useEffect, useState } from "react"
import axios from 'axios'

function AdminSummary() {

const [summary, setSummary] = useState(null)

  useEffect(() => {
   const fetchSummary = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/dashboard/summary", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      })
      
      setSummary(data.data)
    } catch (error) {
      if(error.response){
        alert(error.response.data.error)
      }
      console.log(error);
      
    }
   }
   fetchSummary()
  }, [])

  if(!summary){
    return (
      <div className="flex items-center justify-center h-screen">
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <div className="text-blue-500">Loading...</div>
      </div>
    </div>
    )
  }
  
  return (
    <div className="p-6">
        <h3 className="text-2xl font-bold">Dashboard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-teal-600" />
            <SummaryCard icon={<FaBuilding />} text="Total Department" number={summary.totalDepartments} color="bg-yellow-600" />
            <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={summary.totalSalary} color="bg-red-600" />
        </div>

        <div className="mt-12">
            <h4 className="text-center text-2xl font-bold">Leave Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={summary.LeaveSummary.appliedFor} color="bg-teal-600" />
            <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.LeaveSummary.approved} color="bg-green-600" />
            <SummaryCard icon={<FaHourglassHalf />} text="Leave pending" number={summary.LeaveSummary.pending} color="bg-yellow-600" />
            <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.LeaveSummary.rejected} color="bg-red-600" />
            </div>
        </div>
    </div>
  )
}

export default AdminSummary
