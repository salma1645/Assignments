import { execPath } from "node:process";
import { UserModel } from "../../DB/model/index.js";
import { findByIdAndUpdate,deleteOne, findById } from "../../common/repository/db.repository.js";
import { error } from "node:console";

export const update=async(inputs) =>{
    const{password,...updateddata}=inputs.update
    const result = await findByIdAndUpdate({
        model:UserModel,id:inputs.id,update:updateddata
    })
return result
}

export const Delete=async({ID})=>{// why we detruct avar bec u passs it in the func as ob 
    const result =await deleteOne({  filter: { _id: ID },//so here it will be {_id:{id:""}} wich is invalid
        model: UserModel}) 
        if (result.deletedCount==0) throw new Error("User not found") // that syntax u should write Error else it will give its not a constructor wich means not define
        return result // this actually contain data like dletacc,ack
    }

    export const findbyid=async(id)=>{// why we detruct avar bec u passs it in the func as ob 
    const result =await findById({   id: id , //so here it will be {_id:{id:""}} wich is invalid
        model: UserModel}) 
        return result ;
    }