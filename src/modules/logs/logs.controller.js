import { Router } from "express";
import { createlogs,insertOne } from "./logs.service.js";
import { successResponse } from "../../common/utils/index.js";

const router = Router();

router.post("/capped", async (req, res) => {

     await createlogs();

    return successResponse({
        res,
        status: 201,
    
    });
});
router.post("/insert",async(req,res)=>{
    const data=await insertOne()
    return successResponse({
        res,
        status: 201,
        data
    
    });
})
export default router;


    
