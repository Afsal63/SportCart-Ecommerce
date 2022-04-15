import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router()
import { getCoopens,addNewCoopen,deleteCoopens,getCoopenDetails,applyCoopen } from "../controllers/coopenControllers.js";

router.route('/').post(addNewCoopen).get(getCoopens)
router.route('/:id').delete(deleteCoopens).get(protect,getCoopenDetails)
router.route('/:id/apply').get(protect,applyCoopen)


export default router