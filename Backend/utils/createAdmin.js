import User from "../models/User.js";

export const createAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.log("Admin credentials not found");
      return;
    }

    const admin = await User.findOne({ email });

    if (admin) {
      admin.password = password;
      admin.role = "admin";
      await admin.save();

      console.log("Admin updated successfully");
      return;
    }

    await User.create({
      name: "Admin",
      email,
      password,
      role: "admin",
    });

    console.log("Admin created successfully");
  }
  catch (error) {
    console.error("Admin creation failed:", error.message);
  }
};