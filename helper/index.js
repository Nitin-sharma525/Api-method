import mongoose from 'mongoose';//import mongoose 

const connectDB = async () => { //// Async function to connect to MongoDB database
    try {
        await mongoose.connect('mongodb://localhost:27017/test', {//connection string path
            useNewUrlParser: true,// Use the new MongoDB URL parser
            useUnifiedTopology: true,// Use the new Server Discovery and Monitoring engine
        });
        console.log('MongoDB connected');
    } catch (error) { // If connection fails, log the error
        console.error('MongoDB connection error:', error);
        process.exit(1);// Exit the process with failure code (1)
    }
};

export default connectDB();
