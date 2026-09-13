import {db} from "../../DB/connection.db.js"
const author=db.collection("authors") // implicit collec 

export const insert = async()=>{
    const result=await author.insertOne({
    name:"AUTHOR1",
    nationallity:"British"
})
return result;
}

