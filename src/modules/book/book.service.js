import { bookModel } from "../../DB/model/index.js";
import { db } from "../../DB/connection.db.js";
export const createbookcollection=async ()=>{ // creating explict collec
    await db.createCollection("books",{ //options
        validator:{
            $jsonSchema : {   //"The documents in this collection should follow this JSON-like structure."
                bsonType: "object", //The document must be an object.
        required: ["title"],//title must exist
        properties: {
          title: { 
            bsonType: "string",
            minLength: 1, // bec it can exist as empty string so min=1
          },
        },
            }

        }
    })
    return {message : "ok"}
}
export const createindex=async()=>{
    const result= await db.collection("books").createIndex({
        title:1
    })
    return result
}
export const insertone=async ()=>{
    const result=db.collection("books").insertOne(
        {
            title : "Book1",
            author :"Ali",
            year: "1937",
            genres: ["fantasy","Adventure"]

        }
    )
    return result
}
export const insertbatch= async()=>{
    const result= await db.collection("books").insertMany(
        [
  {
    title: "Future",
    author: "J.K. Rowling",
    year: 1997,
    genres: ["Fantasy", "Adventure"]
  },
  {
    title: "Brave New World" ,
    author: "J.R.R. Tolkien",
    year: 2010,
    genres: ["Science Fiction", "Adventure"]
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 2006,
    genres: ["Fiction", "Science Fiction"]
  }
]);
return result

}
export const update= async()=>{
    const result=await db.collection("books").updateOne(
        {title:"Future"},
        {
            $set:{year:2022}
        }
    )
    return result
}
export const find=async (title)=>{
const result= await db.collection("books").findOne({title: title}
)
return result }
export const findmany=async (year1,year2)=>{
const result= await db.collection("books").find({year:{
    $gte:year1,
    $lte : year2
}}
).toArray()
return result }

export const findgenres=async (genres)=>{
const result= await db.collection("books").find({genres: genres}
).toArray()
return result}

export const skip=async()=>{
    const result= await db.collection("books").find({}).sort({year:-1}).skip(2).limit(3).toArray()
    return result
}
export const year_int=async()=>{
    const res=await db.collection("books").find({year:{
        $type :"int"}}).toArray()
        return res
}
export const exclude_genres=async()=>{
    const res=await db.collection("books").find({genres:{
        $nin:["Horro","Science Fiction"]
    }} ).toArray()
        return res
}
export const before_year=async(year)=>{
    const res=await db.collection("books").deleteMany({
year:{
    $lt:year
}
    })
        return res
}
export const aggregate1=async()=>{
    const res=await db.collection("books").aggregate([
        {
            $match:{ year:{
                $gt:2000
            }}
        },
        {
            $sort:{year:-1}
        }
    ]
).toArray()
        return res
}
export const aggregate2=async()=>{
    const res=await db.collection("books").aggregate([
        {
            $match:{ year:{
                $gt:2000
            }}
        },{
        $project:{  _id:0,
                title:1 ,
                author:1 ,
                year:1
        }
           
        }
    ]
).toArray()
        return res
}
export const aggregate3=async()=>{
    const res=await db.collection("books").aggregate([
        {
    $unwind:"$genres"
           
        }
    ]
).toArray()
        return res
}
export const aggregate4=async()=>{
    const res=await db.collection("logs").aggregate([ //"For every log, find the matching book from the books collection."
        {
   $lookup:{
    from: "books",
     localField: "book_id",
    foreignField: "_id",
as :"book_deatils"
   }

    } ,{
    $project:
    {
 _id: 0,
        action: 1,
        "book_deatils.title": 1,
        "book_deatils.author": 1,
        "book_deatils.year": 1
   }
           
        }
    ]
).toArray()
        return res
}