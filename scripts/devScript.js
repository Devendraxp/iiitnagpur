import mongoose from "mongoose";
import Faculty from "./models/faculty.model.js";

const MONGODB_URI = "mongodb+srv://devendradhuvan:8440088Dev@cluster01.uw7df.mongodb.net/iiitn?retryWrites=true&w=majority&appName=Cluster01";

async function updateFacultyPriority() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
    
    // Update all faculty documents that don't have a priority field
    const result = await Faculty.updateMany(
      { priority: { $exists: false } },
      { $set: { priority: 211 } }
    );
    
    console.log(`Updated ${result.modifiedCount} faculty documents`);
    console.log(`${result.matchedCount} documents matched the query`);
    
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    
  } catch (error) {
    console.error("Error updating faculty priority:", error);
  }
}

updateFacultyPriority();