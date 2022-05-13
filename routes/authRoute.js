

import {register, login, updateUser} from "../controllers/authControllers.js"
import auth from "../middleware/auth.js"
import express from "express"
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/updateUser").patch(auth, updateUser)


export default router;