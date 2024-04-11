import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export async function connectDB(): Promise<void> {
    if (connection.isConnected) {
        console.log('Already connected')
        return
    }
    try {
        const db = await mongoose.connect(process.env.NEXT_MONGODB_URI as string)
        connection.isConnected = db.connections[0].readyState
        console.log('Connected to MongoDB', db.connections[0].readyState)

    } catch (error) {
        console.log(error)
        connection.isConnected = 0
        process.exit(1)
    }
}