import { Router } from "express";
import { successResponse } from "../../common/utils/index.js";
import { update ,Delete,findbyid} from "./user.service.js";


const router = Router();
router.patch("/:id",async(req,res,next)=>{
    const acc= await update({id: req.params.id  ,update:req.body})
   return successResponse({ res, status: 201, data:acc })
 }
);

router.delete("/:id",async(req,res,next)=>{
    try{const acc= await Delete( {id :req.params.id})
    // Mongoose automatically converts a valid ObjectId string into an ObjectId when querying.
    //also here u created an obj called id with this value so,u should destruct the value 
     
    return successResponse({ res, status: 201,data:acc})//mongoose by default in delete return sth like deletedcount
}
catch(err){next(err)}
}) 

router.get("/:id",async(req,res,next)=>{
    const acc =await findbyid(req.params.id)
     return successResponse({ res, status: 201, data:acc })
} )


 export default router;