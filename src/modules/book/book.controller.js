import { Router } from "express";
import { successResponse } from "../../common/utils/index.js";
import { createbookcollection, createindex ,insertone,insertbatch,update,find,findmany,findgenres,skip,year_int, exclude_genres,before_year,aggregate1,aggregate2,aggregate3,aggregate4} from "./book.service.js";


const router = Router();
router.post("/",async (req,res)=>{

const data =await createbookcollection()
return successResponse({
    res,
    status: 201,
    data,
  });
})
router.post("/index",async(req,res)=>{
  const data =await createindex()
  return successResponse({
    res,
    status: 201,
    data,
  });

})
router.post("/insert",async(req,res)=>{
  const data = await insertone()
  return successResponse({
    res,
    status: 201,
    data,
  }); } )
  router.post("/insert/batch",async(req,res)=> {
    const data = await insertbatch()
    return successResponse({
    res,
    status: 201,
    data,
  });
  })
  router.post("/update",async(req,res)=>{
    const data = await update()
    return successResponse({
    res,
    status: 201,
    data,
  });
  })
  router.get("/title",async(req,res)=>{
    const data= await find(req.query.title)
    return successResponse({
    res,
    status: 201,
    data,
  });
  })
router.get("/year",async(req,res)=>{
  const year1=Number(req.query.from)
  const year2=Number(req.query.to)
    const data= await findmany(year1,year2)
    return successResponse({
    res,
    status: 201,
    data,
  });
  })
router.get("/genre",async(req,res)=>{
    const data= await findgenres(req.query.genre)
    return successResponse({
    res,
    status: 201,
    data,
  });
  })
router.get("/skip-limit",async(req,res)=>
{
  const data=await skip()
  return successResponse({
    res,
    status: 201,
    data,
  });
})

router.get("/year-integer",async(req,res)=>
{
  const data=await year_int()
  return successResponse({
    res,
    status: 201,
    data,
  });
})
router.get("/exclude-genres",async(req,res)=>
{
  const data=await exclude_genres()
  return successResponse({
    res,
    status: 201,
    data,
  });
})
router.get("/before-year",async(req,res)=>
{
  const year=Number(req.query.year)
  const data=await before_year(year)
  return successResponse({
    res,
    status: 201,
    data,
  });
})
router.get("/aggregate1",async(req,res)=>
{
  const data=await aggregate1()
  return successResponse({
    res,
    status: 201,
    data,
  });
})
router.get("/aggregate2",async(req,res)=>
{
  const data=await aggregate2()
  return successResponse({
    res,
    status: 201,
    data,
  });
})
router.get("/aggregate3",async(req,res)=>
{
  const data=await aggregate3()
  return successResponse({
    res,
    status: 201,
    data,
  });
})
router.get("/aggregate4",async(req,res)=>
{
  const data=await aggregate4()
  return successResponse({
    res,
    status: 201,
    data,
  });
})
export default router;
