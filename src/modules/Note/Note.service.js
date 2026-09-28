import { createOne, findById, findByIdAndUpdate, findOneAndUpdate, findOneAndReplace, UpdateMany, find, findOneAndDelete, findOne, aggregation, deleteMany } from "../../common/repository/db.repository.js"
import { Notemodel } from "../../DB/model/note.model.js"
import mongoose from "mongoose";

export const Create = async ({ id, title, content }) => {

    const res = await createOne({ model: Notemodel, data: { user_id: id, title: title, content: content } })

    return res
}
export const update = async ({ id, data, userID }) => {
    const note = await findById({ id: id, model: Notemodel })
    if (!note) {
        throw new Error("note not found", {
            cause: { status: 404 }
        })
    }
    if (note.user_id.toString() != userID) {
        throw new Error("you are not owner", {
            cause: { status: 403 }
        })
    }


    const res = await findOneAndUpdate({
        filter: { _id: id, user_id: userID }, model: Notemodel, update: data, options: {
            new: true,
        }
    })//"After updating, give me the document after the update."

    return res
}
export const replace = async ({ id, data, userID }) => {
    const note = await findById({ id: id, model: Notemodel })
    if (!note) {
        throw new Error("note not found", {
            cause: { status: 404 }
        })
    }
    if (note.user_id.toString() != userID) {
        throw new Error("you are not owner", {
            cause: { status: 403 }
        })
    }

    const result = await findOneAndReplace({
        filter: {
            _id: id,
            user_id: userID
        },
        model: Notemodel,
        replacement: data,
        options: {
            returnDocument: "after"
        }
    });

    return result;
};
export const updateall = async ({ user_id, Title }) => {
    const note = await find({ filter: { user_id: user_id }, model: Notemodel }) //find returns an array and if it did find it return [] wich is bollean true so in if cond u cant make !note bec it will give false and wont throw err
    if (note.length == 0) { throw new Error("no notes found") }

    const res = await UpdateMany({ model: Notemodel, filter: { user_id: user_id }, update: { title: Title } })
    return res
}
export const deletednote = async ({ id, options = {} } = {}) => {
    const result = await findOneAndDelete({
        model: Notemodel,
        filter: { _id: id }, options
    })//here in options there isnt new:true this in findandupdate while here in  It simply returns the document that it deleted.
    if (!result) { throw new Error("note not found") }
    return result
}

export const Find = async ({ id, page, limit, options = {} } = {}) => {
    //pagination formula
    const skip = (page - 1) * limit
    const result = await find({
        model: Notemodel,
        filter: { user_id: id }, options: {
            sort: { createdAt: -1 },
            skip: skip,
            limit: limit
        }
    })// u cant .skip(page).limit(limit)
    if (result.length == 0) { throw new Error("no notes found") }
    return result
}

export const FindONE = async ({ id, user_id }) => {

    const res = await findById({ model: Notemodel, id: id })
    if (!res) { throw new Error("note not found") }
    if (res.user_id.toString() != user_id) { throw new Error("U ARE NOT OWNER") }
    return res
}

export const findbycontent = async ({ user_id, content }) => {//JavaScript matches destructuring by property name so namr should match the input

    const res = await findOne({ model: Notemodel, filter: { content: content, user_id: user_id } })
    if (!res) { throw new Error("note not found") }

    return res
}
export const findall = async ({ user_id }) => {

    const res = await find({
        model: Notemodel, filter: { user_id: user_id }, select: "title user_id createdAt" // select take string in repositry but in genreal it takes
        //  .select({title: 1,ser_id: createdAt: 1})
        , options: {
            populate: {//populate() is Mongoose's convenient way of following that reference.
                path: "user_id", //The field in your Note that contains the reference is userid not  ref: "User" Because Mongoose already knows the model is "User" from your schema's ref.
                select: "email -_id"
            }
        }
    })
    if (res.length == 0) { throw new Error("note not found") }
    return res
}

export const Aggregation = async ({ user_id, title }) => {
  ;
   const filter={
         user_id:new  mongoose.Types.ObjectId(user_id) //Here you're building a MongoDB aggregation pipeline.
//Mongoose does not reliably cast values inside aggregation pipeline stages the same way it does for normal Mongoose queries.
    }

if(title) {
  filter.title=title;//U CAN ADD IN THIS Way
}
    const res = await aggregation({model : Notemodel, pipeline: [
          {
                $match:filter
            },
               {
            $lookup: {
                from: "Users",
                localField: "user_id",
                foreignField: "_id",
                as: "USER"
            }
        },         {
            $unwind:"$USER" //without quotes itt is interpreted as var
        },
{
    $project :{
        title:1,
        createdAt:1,
        user_id:1,
        "USER.name":1,
        "USER.email":1
    }
}

   

    ]})
    return res

}

export const deleteall = async (user_id ) => {
    const result = await deleteMany({
        model: Notemodel,
        filter: { user_id: new mongoose.Types.ObjectId(user_id) }
    })
    if (!result) { throw new Error("no notes found") }
    return result
    }