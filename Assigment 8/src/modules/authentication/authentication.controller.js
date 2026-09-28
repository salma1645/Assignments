//Handles authentication — things related to entering/leaving the system:
//also cntr is the one that takes req ande send res while service contains the logic
import { Router } from "express";
import { login, signup } from "./authentication.service.js";
import { successResponse } from "../../common/utils/success.response.js";
const router = Router();

router.post("/signup", async (req, res,next) => {
  
 try{ const data = await signup(req.body);
  
  return successResponse({ res, status: 201, data });
}
catch(error){next(error)} }// why we make try,catch bec,in logic it throw err so,i sgould catch it and send it to globalerr through next else global wont recieve it
);
router.get("/login", async (req, res,next) => {
 try { const data = await login(req.body);
  return successResponse({ res, status: 201, data }); } catch(error){next(error)}
});
export default router;
