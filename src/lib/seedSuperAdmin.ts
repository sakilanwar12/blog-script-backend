import bcrypt from "bcrypt";
import User from "../app/modules/user/user.model";
import { envVariables } from "../config";

export const seedSuperAdmin = async () => {
  const exists = await User.findOne({ role: "superadmin" });

  if (exists) {
    console.log("✅ SuperAdmin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(
    envVariables.SUPERADMIN_PASSWORD,
    12
  );

  await User.create({
    name: "Super Admin",
    email: envVariables.SUPERADMIN_EMAIL,
    password: hashedPassword,
    role: "superadmin",
  });

  console.log("🔥 SuperAdmin created");
};
