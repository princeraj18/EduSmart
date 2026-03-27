import express from "express";
import { adminRoute, protectAdmin, protectUserOrAdmin } from "../middleware/auth.middleware.js";
import { createModule, getComment, getSingleCourseModule } from "../controllers/module.controller.js";
import { videoUpload } from "../middleware/videoUpload.js";

const moduleRoute = express.Router()


moduleRoute.post('/createModule', protectAdmin, adminRoute, videoUpload.single('video'), createModule)
moduleRoute.get('/getModule/:id', protectUserOrAdmin, getSingleCourseModule)
moduleRoute.get('/comment/:id', protectUserOrAdmin, getComment)

export default moduleRoute