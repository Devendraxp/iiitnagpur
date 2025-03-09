import mongoose from 'mongoose';
import Faculty from '../models/faculty.model.js';
import FacultyUser from '../models/facultyUser.model.js';

const DEFAULT_PASSWORD = 'abc@123';
const MONGODB_URI = "mongodb+srv://devendradhuvan:8440088Dev@cluster01.uw7df.mongodb.net/iiitn?retryWrites=true&w=majority&appName=Cluster01";

async function createFacultyUsers() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        
        // Get all faculty members
        const faculties = await Faculty.find({});
        console.log(`Found ${faculties.length} faculty members`);
        
        let created = 0;
        let skipped = 0;
        let updated = 0;
        let errors = 0;
        
        // Process each faculty member
        for (const faculty of faculties) {
            try {
                // Skip if no username or email
                if (!faculty.username || !faculty.email) {
                    console.log(`Skipping faculty ${faculty._id}: Missing username or email`);
                    skipped++;
                    continue;
                }
                
                // Check if user already exists
                const existingUser = await FacultyUser.findOne({ username: faculty.username });
                if (existingUser) {
                    console.log(`User already exists for ${faculty.username}, resetting password`);
                    // Reset password for existing user
                    await existingUser.setPassword(DEFAULT_PASSWORD);
                    await existingUser.save();
                    console.log(`Password reset for ${faculty.username}`);
                    updated++;
                    continue;
                }
                
                // Create new faculty user
                const newUser = new FacultyUser({
                    username: faculty.username,
                    email: faculty.email,
                    faculty: faculty._id
                });
                
                // Register user with passport
                await FacultyUser.register(newUser, DEFAULT_PASSWORD);
                console.log(`Created user for ${faculty.name} (${faculty.username})`);
                created++;
            } catch (err) {
                console.error(`Error processing faculty ${faculty._id}:`, err.message);
                errors++;
            }
        }
        
        console.log('\nSummary:');
        console.log(`- Created: ${created}`);
        console.log(`- Passwords reset: ${updated}`);
        console.log(`- Skipped: ${skipped}`);
        console.log(`- Errors: ${errors}`);
        console.log(`- Total processed: ${faculties.length}`);
        
    } catch (err) {
        console.error('Script error:', err);
    } finally {
        // Close MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

// Run the script
createFacultyUsers()
    .then(() => {
        console.log('Script execution completed');
        process.exit(0);
    })
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });