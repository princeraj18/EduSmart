import crypto from "crypto";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { sendResetPasswordEmail } from "../utils/sendResetPasswordEmail.js";


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // always generic response prevents email enumeration
    const genericMessage =
      "If this email exists, a reset link has been sent.";

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: genericMessage,
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    await sendResetPasswordEmail(user.email, token);

    return res.status(200).json({
      success: true,
      message: genericMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send reset link",
    });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // ✅ HASH NEW PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ SAVE HASHED PASSWORD
    user.password = hashedPassword;

    // ✅ CLEAR TOKEN AFTER USE
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Reset failed",
    });
  }
};