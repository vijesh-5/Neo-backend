import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}`)
        console.log(`\n Mongo DB Connected !!! 
            ${connectionInstance.connection.host})`);
    } catch (error) {
        console.log("Mongo DB connection failed " , error);
        process.exit(1);
    }
}

export default connectDB;