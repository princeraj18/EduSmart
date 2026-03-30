import express from "express";
import { forgotPassword, resetPassword } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/forgot-password", forgotPassword);
authRoute.post("/reset-password/:token", resetPassword);

export default authRoute;