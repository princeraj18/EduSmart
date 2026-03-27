import { Admin } from "../models/admin.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ENV } from "../config/env.js";

export const RegisterAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all details' });
    }

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Admin already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ name, email, password: hashed });

    const token = jwt.sign({ adminId: admin._id }, ENV.JWT_SECRET);

    const cookieOptions = {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }

    res.cookie('adminToken', token, cookieOptions);

    return res.status(201).json({ success: true, message: 'Admin registered', admin: { name: admin.name, email: admin.email } });
  } catch (error) {
    console.error('RegisterAdmin error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Please provide all details' });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ adminId: admin._id }, ENV.JWT_SECRET);

    const cookieOptions = {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }

    res.clearCookie("token")   // ✅ remove user session

    res.cookie('adminToken', token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,        // 👈 for localhost
      sameSite: "lax"
    })
    return res.status(200).json({ success: true, message: 'Welcome admin' });
  } catch (error) {
    console.error('LoginAdmin error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const LogoutAdmin = async (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: false,   // 👈 MUST match login
      sameSite: "lax",
      path: "/"
    }

    res.clearCookie("adminToken", cookieOptions)
    res.clearCookie("token", cookieOptions)   // ✅ ALSO CLEAR USER

    return res.status(200).json({
      success: true,
      message: "Admin logged out"
    })
  } catch (error) {
    console.error('LogoutAdmin error:', error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const GetAdmin = async (req, res) => {
  try {
    // protectAdmin middleware attaches req.admin
    const admin = req.admin
    if (!admin) return res.status(401).json({ success: false, message: 'Not authenticated' })

    return res.status(200).json({ success: true, admin })
  } catch (error) {
    console.error('GetAdmin error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}
