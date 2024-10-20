import express from 'express';
import cors from 'cors';
import connectDB from './database.js';
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'

const app = express()

connectDB()
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)

app.listen(process.env.PORT, ()=> {
    console.log(`server listening on port number ${process.env.PORT}`);
    
})
