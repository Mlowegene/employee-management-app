import express from 'express';
import cors from 'cors';
import connectDB from './database.js';
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'

const app = express()

connectDB()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)


app.listen(process.env.PORT, ()=> {
    console.log(`server listening on port number ${process.env.PORT}`);
    
})
