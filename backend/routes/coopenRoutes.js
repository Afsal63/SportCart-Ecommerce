import express from "express";
const router=express.Router()
import { getCoopens,addNewCoopen,deleteCoopens,getCoopenDetails } from "../controllers/coopenControllers.js";

router.route('/').post(addNewCoopen).get(getCoopens)
router.route('/:id').delete(deleteCoopens).get(getCoopenDetails)

export default router