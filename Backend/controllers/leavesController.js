import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";


const addLeave = async (req, res) => {
    try {
        const {userId, leaveType, startDate, endDate, reason } = req.body;
        const employee = await Employee.findOne({userId});

        const newLeave = new Leave({
            employeeId: employee._id, 
            leaveType, 
            startDate, 
            endDate, 
            reason,
        })

        await newLeave.save()

        return res.status(200).json({success: true})

    } catch (error) {
        return res.status(500).json({success: false, error: "leave add server error"})
    }
}

const getLeaves = async (req, res) => {
    try {
        const {id, role} = req.params;
        let leaves
        if(role === "admin"){

             leaves = await Leave.find({employeeId: id})
        }else {

            const employee = await Employee.findOne({userId: id})
             leaves = await Leave.find({employeeId: employee._id})
        }
        return res.status(200).json({success: true, leaves})
    } catch (error) {
        return res.status(500).json({success: false, error: "leaves get server error"})
    }
}

export {addLeave, getLeaves};