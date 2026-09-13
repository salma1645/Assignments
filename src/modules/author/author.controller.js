import {Router} from "express"
import { insert } from "./author.service.js";
import { successResponse } from "../../common/utils/index.js";
const router = Router();
router.post("/",async(req,res)=>{
   const data= await insert()
   return successResponse({
       res,
       status: 201,
       data,
     });
   })
export default router
