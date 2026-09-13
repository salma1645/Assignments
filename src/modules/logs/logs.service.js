import {db} from "../../DB/connection.db.js"

export const createlogs= async()=>{
  await db.createCollection("logs",{
    capped: true,
    size: 1024 * 1024
}) } 

export const insertOne = async()=>{
    const result = await db.collection("logs").insertOne(
        {
            book_id : "79868568685" ,
            action :"borrowed"
        }
    )
    return result
}

