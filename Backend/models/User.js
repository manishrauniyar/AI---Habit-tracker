// -------------Use bcrypt------------



import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: "" },
    morningMotivation: { type: Boolean, default: false },   
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = mongoose.model("User", userSchema);

export default User;



// import mongoose from "mongoose";


// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, trim: true, lowercase: true },
//     password: { type: String, required: true, minlength: 6 },
//     avatar: { type: String, default: "" },
//     morningMotivation: { type: Boolean, default: false },

//     //added
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },

    
//   },
//   { timestamps: true }
// );


// userSchema.methods.matchPassword = function (plain) {
//   return plain === this.password;
// };


// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };



// const User = mongoose.model("User", userSchema);


// export default User;