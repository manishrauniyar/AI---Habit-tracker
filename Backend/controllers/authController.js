// no need admin


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const signToken = (id) =>
// jwt.sign(
// { id },
// process.env.JWT\_SECRET,
// {
// expiresIn: process.env.JWT\_EXPIRES\_IN || "30d",
// }
// );

// // ================= Register =================
// export const register = async (req, res) => {
// try {
// const { name, email, password } = req.body;

// ```
// if (!name || !email || !password) {
//   return res
//     .status(400)
//     .json({ message: "Name, email and password is required" });
// }

// if (password.length < 6) {
//   return res
//     .status(400)
//     .json({ message: "Password must be at least 6 characters" });
// }

// const exists = await User.findOne({
//   email: email.toLowerCase(),
// });

// if (exists) {
//   return res
//     .status(400)
//     .json({ message: "Email already registered" });
// }

// const user = await User.create({
//   name,
//   email: email.toLowerCase(),
//   password,
//   avatar: name.charAt(0).toLowerCase(),
// });

// const token = signToken(user._id);

// res.status(201).json({
//   user,
//   token,
// });
// ```

// } catch (err) {
// console.error(err);
// res.status(500).json({
// message: err.message,
// });
// }
// };

// // ================= Login =================
// export const login = async (req, res) => {
// try {
// const { email, password } = req.body;

// ```
// if (!email || !password) {
//   return res
//     .status(400)
//     .json({ message: "Email and password is required" });
// }

// const user = await User.findOne({
//   email: email.toLowerCase(),
// });

// if (!user || !(await user.matchPassword(password))) {
//   return res
//     .status(401)
//     .json({ message: "Invalid email or password" });
// }

// const token = signToken(user._id);

// res.json({
//   user,
//   token,
// });
// ```

// } catch (err) {
// console.error(err);
// res.status(500).json({
// message: err.message,
// });
// }
// };

// // ================= Current User =================
// export const me = async (req, res) => {
// res.json({
// user: req.user,
// });
// };

// // ================= Update Profile =================
// export const updateProfile = async (req, res) => {
// try {
// const user = req.user;

// ```
// const { name, morningMotivation } = req.body;

// if (name !== undefined) {
//   user.name = name;
//   user.avatar = name.charAt(0).toLowerCase();
// }

// if (morningMotivation !== undefined) {
//   user.morningMotivation = morningMotivation;
// }

// await user.save();

// res.json({
//   user,
// });
// ```

// } catch (err) {
// console.error(err);
// res.status(500).json({
// message: err.message,
// });
// }
// };






import jwt from "jsonwebtoken";
import User from "../models/User.js";


const signToken = (id) =>
jwt.sign(
  { id },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  }
);

// ================= Register =================
export const register = async (req, res) => {
try {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password is required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  if (email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()) {
    return res.status(403).json({ message: "This email is reserved for admin" });
  }

  const exists = await User.findOne({
    email: email.toLowerCase(),
  });

  if (exists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    avatar: name.charAt(0).toLowerCase(),
    role: "user",
  });

  const token = signToken(user._id);

  res.status(201).json({
    user,
    token,
  });
}
catch (err) {
  console.error(err);
  res.status(500).json({ message: err.message });
}
};

// ================= Login =================
export const login = async (req, res) => {
try {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password is required" });
  }

  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken(user._id);

  res.json({
    user,
    token,
  });
}
catch (err) {
  console.error(err);
  res.status(500).json({ message: err.message });
}
};


// ================= Current User =================
export const me = async (req, res) => {
res.json({
  user: req.user,
});
};


// ================= Update Profile =================
export const updateProfile = async (req, res) => {
try {
  const user = req.user;
  const { name, morningMotivation } = req.body;




  if (name !== undefined) {
    user.name = name;
    user.avatar = name.charAt(0).toLowerCase();
  }

  if (morningMotivation !== undefined) {
    user.morningMotivation = morningMotivation;
  }

  await user.save();


  res.json({
    user,
  });
}
catch (err) {
  console.error(err);
  res.status(500).json({ message: err.message });
}
};