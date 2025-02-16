import mongoose, { connect } from "mongoose";

const MONGODB_URI =
  "mongodb+srv://devendradhuvan:8440088Dev@cluster01.uw7df.mongodb.net/iiitn?retryWrites=true&w=majority&appName=Cluster01";

export default function connectDB() {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connect to database successfully 🚀🚀🚀🚀 \n");
    })
    .catch((e) => {
      console.log(`Error while connecting to database 🐛🐛 : ${e} `);
    });
}
   