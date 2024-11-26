import axios from "axios"
import { useState, useEffect } from "react"
import { useParams} from "react-router-dom"
import { useAuth } from "../../context/authContext";


function View() {

const [salaries, setSalaries] = useState(null);
const [filteredSalaries, setFilteredSalaries] = useState(null)
const {id} = useParams()

const {user} = useAuth()

let sno = 1;

const fetchSalaries = async () => {
    try {
       const response = await axios.get(`https://employee-management-api-one-iota.vercel.app/api/salary/${id}/${user.role}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
       });
       
       if(response.data.success){
            setSalaries(response.data.salary)
            setFilteredSalaries(response.data.salary)
       }
    } catch (error) {
        if(error.response && !error.resposne.data.success){
            alert(error.message)
        }
    }
}

 useEffect(()=> {
    fetchSalaries()
 }, [])

 const filterSalaries = (q) => {
    const filterRecords = salaries.filter((leave) => 
    leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setFilteredSalaries(filterRecords)
 }

  return (
    <>
    {filteredSalaries === null ? (
        <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <div className="text-blue-500">Loading...</div>
         </div>
     </div>
    ) : (
        <div className="overflow-x-auto p-5">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Salary History</h2>
            </div>
            <div className="flex justify-end my-3">
                <input 
                type="text" 
                placeholder="Search by Emp Id" 
                className="border px-2 rounded-md py-0.5 border-gray-300"
                onChange={filterSalaries}
                />
            </div>
            {filterSalaries.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 border border-gray-200">
                        <tr>
                        <th className="px-6 py-3">SNO</th>
                        <th className="px-6 py-3">Emp ID</th>
                        <th className="px-6 py-3">Salary</th>
                        <th className="px-6 py-3">Allowance</th>
                        <th className="px-6 py-3">Deduction</th>
                        <th className="px-6 py-3">Total</th>
                        <th className="px-6 py-3">Pay Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaries.map((salary)=> (
                            <tr
                            key={salary.id}
                            className="bg-white border-b dark:border-gray-700"
                            >
                                <td className="px-6 py-3">{sno++}</td>
                                <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                                <td className="px-6 py-3">{salary.basicSalary}</td>
                                <td className="px-6 py-3">{salary.allowances}</td>
                                <td className="px-6 py-3">{salary.deductions}</td>
                                <td className="px-6 py-3">{salary.netSalary}</td>
                                <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <div className="flex items-center justify-center text-xl">No Records</div>}
        </div>
    )}
    </>
  )
}

export default View
