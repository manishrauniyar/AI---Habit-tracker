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
import crypto from "crypto";

import User from "../models/User.js";
import { sendResetPasswordEmail } from "../utils/email.js";

// ================= Create JWT Token =================
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
      return res.status(400).json({
        message: "Name, email and password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    if (email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()) {
      return res.status(403).json({
        message: "This email is reserved for admin",
      });
    }

    const exists = await User.findOne({
      email: email.toLowerCase(),
    });

    if (exists) {
      return res.status(400).json({
        message: "Email already registered",
      });
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

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


// ================= Login =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = signToken(user._id);

    res.json({
      user,
      token,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
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

    const {
      name,
      morningMotivation,
    } = req.body;

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

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


// ======================================================
//                 FORGOT PASSWORD
// ======================================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check email
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate random token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Hash token before saving to database
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expires after 15 minutes
    user.resetPasswordExpires =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    // Create reset link
    const resetLink =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Send email
    await sendResetPasswordEmail(
      user.email,
      resetLink
    );

    res.status(200).json({
      message: "Password reset link sent to your email",
    });

  } catch (error) {
    console.error(
      "FORGOT PASSWORD ERROR:",
      error
    );

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};


// ======================================================
//                 RESET PASSWORD
// ======================================================

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Check password
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    // Password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Hash token received from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      // Token must not be expired
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    // Set new password
    user.password = password;

    // Remove reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    // Save user
    // Your User model's password middleware
    // should hash the new password here.
    await user.save();

    res.status(200).json({
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error(
      "RESET PASSWORD ERROR:",
      error
    );

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};