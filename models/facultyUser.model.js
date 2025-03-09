import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const facultyUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true
  }
}, { timestamps: true });

const options = {
  usernameField: 'username',
  errorMessages: {
    UserExistsError: 'A user with the given username already exists.',
    IncorrectUsernameError: 'Username or password is incorrect',
    IncorrectPasswordError: 'Username or password is incorrect'
  }
};

facultyUserSchema.plugin(passportLocalMongoose, options);

const FacultyUser = mongoose.model("FacultyUser", facultyUserSchema);
export default FacultyUser;