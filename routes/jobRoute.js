
import {createJob,deleteJobs,getAllJobs,showStats,updateJobs} from "../controllers/jobController.js"

import express from "express"
const router = express.Router()

router.route("/createJob").post(createJob).get(getAllJobs)
//remember about :id
router.route("/stats").get(showStats)
router.route("/:id").patch(updateJobs).delete(deleteJobs)


export default router;