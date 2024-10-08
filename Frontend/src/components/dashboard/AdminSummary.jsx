import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa"
import SummaryCard from './SummaryCard'
function AdminSummary() {
  return (
    <div className="p-6">
        <h3 className="text-2xl font-bold">Dashboard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <SummaryCard icon={<FaUsers />} text="Total Employees" number={13} color="bg-teal-600" />
            <SummaryCard icon={<FaBuilding />} text="Total Department" number={5} color="bg-yellow-600" />
            <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number="$500" color="bg-red-600" />
        </div>

        <div className="mt-12">
            <h4 className="text-center text-2xl font-bold">Leave Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={5} color="bg-teal-600" />
            <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={2} color="bg-green-600" />
            <SummaryCard icon={<FaHourglassHalf />} text="Leave pending" number={3} color="bg-yellow-600" />
            <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={1} color="bg-red-600" />
            </div>
        </div>
    </div>
  )
}

export default AdminSummary
