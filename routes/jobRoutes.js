import { Router } from "express";
import { getAllJobs,deleteJob,updateJob,getSingleJob,createJob } from "../controllers/jobController.js";
import { validateJobInput ,validateIdParam} from "../middlewares/validationMiddleware.js";
const router=Router();


// //Get ALL Jobs
// router.get("/",getAllJobs)


//Create Job
// router.post("/",createJob)

// //get Single job
// router.get("/:id",getSingleJob)

// //Update JOb
// router.patch("/:id",updateJob);

// router.delete("/:id",deleteJob)


router.route("/").get(getAllJobs).post(validateJobInput,createJob);
router.route("/:id").get(validateIdParam,getSingleJob).patch(validateIdParam,validateJobInput,updateJob).delete(validateIdParam,deleteJob);
export default router;