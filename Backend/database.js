import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://genemlowe:igawisenga@employee-cluster.8svrc.mongodb.net/test?retryWrites=true&w=majority&appName=Employee-Cluster");
        console.log("MongoDB is connected");
        
    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}

export default connectDB;