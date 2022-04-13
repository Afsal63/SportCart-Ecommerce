import express from "express";
const router=express.Router()

import{googleLogin}from "../controllers/userController.js";

router.route('/').post(googleLogin)


export default router