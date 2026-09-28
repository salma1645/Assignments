import { Router } from "express";
import { successResponse } from "../../common/utils/index.js";
import { Create, update, replace, updateall, deletednote, Find, FindONE, findbycontent, findall, Aggregation,deleteall } from "./Note.service.js";
const router = new Router();

router.post("/:id", async (req, res, next) => {
    try {
        const data = {
            id: req.params.id,
            title: req.body.title,
            content: req.body.content
        }
        const acc = await Create(data)

        return successResponse({ res, status: 201, data: acc })
    }
    catch (err) {
        next(err)
    }
})
router.patch("/:id", async (req, res, next) => {
    try {
        const data = req.body
        const id = req.params.id
        const userID = req.query.id
        const Data = await update({ id, data, userID })
        return successResponse({ res, status: 201, data: Data })
    }
    catch (err) { next(err) }
})
router.patch("/replace/:id", async (req, res, next) => {
    try {
        const title = req.body.title //bec req.ody give the whole obj
        const user_id = req.params.id
        const Data = await updateall({ user_id, title })
        return successResponse({ res, status: 201, message: "all note updated", data: Data })
    }
    catch (err) { next(err) }
})
router.delete("/:noteid", async (req, res, next) => {
    try {
        const acc = await deletednote({ id: req.params.noteid })
        // Mongoose automatically converts a valid ObjectId string into an ObjectId when querying.
        //also here u created an obj called id with this value so,u should destruct the value 

        return successResponse({ res, status: 201, data: acc })//mongoose by default in delete return sth like deletedcount
    }
    catch (err) { next(err) }
})
router.get("/paginate-sort", async (req, res, next) => {
    try {
        const acc = await Find({ id: req.query.id, page: Number(req.query.page), limit: Number(req.query.limit) })
        return successResponse({ res, status: 201, data: acc })
    }
    catch (err) { next(err) }
})
router.get("/note-by-content", async (req, res, next) => {
    try {
        const acc = await findbycontent({ user_id: req.query.user_id, content: req.query.content })
        return successResponse({ res, status: 201, data: acc })
    }
    catch (err) { next(err) }
})
// so here we put router.get("/note-by-content" before router.get("/:id"   bec if id is first express would think theat note by content is the id name Bec Express reads routes from top to bottom.
router.get("/note-with-user", async (req, res, next) => {
    try {
        const acc = await findall({ user_id: req.query.user_id })
        return successResponse({ res, status: 201, data: acc })
    }
    catch (err) { next(err) }
})
router.get("/aggregation", async (req, res, next) => {
    try {

        const acc = await Aggregation({ user_id: req.query.user_id, title: req.query.title })
        return successResponse({ res, status: 201, data: acc })
    }
    catch (err) { next(err) }
})

router.get("/:id", async (req, res, next) => {
    try {
        const acc = await FindONE({ id: req.params.id, user_id: req.query.user_id })
        return successResponse({ res, status: 201, data: acc })
    }
    catch (err) { next(err) }
}) //Specific route first → dynamic :id route last.Because :id can accidentally catch the name of another route.

router.delete("/", async (req, res, next) => {
    try {
        const acc = await deleteall( req.query.user_id )
  
        return successResponse({ res, status: 201, data: acc })  }
    catch (err) { next(err) }
})
export default router