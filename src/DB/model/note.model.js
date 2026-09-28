import mongoose from "mongoose";

const noteschema = new mongoose.Schema(
    {
        title: {
            type: String, required: true,
            validate: { ///validate tell i want to make validation rule
                validator: function (value) { //the name we give func
                    return value !== value.toUpperCase()
                }, message: "Title cant be entirely uppercase" // mongoose know that if fails it should send this msg like internally does throw err
            }, 
        },
            content: { type: String, required: true },
            user_id: {
                type: mongoose.Schema.Types.ObjectId, //why we didnt write shorthand objid bec js doesnt know what is this type
                ref: "User",
                required: true
            }
        
    }
    , {
        timestamps: true ,//timestamps belongs to the Schema, not the Service.
    }

) //only structure not actually creating collection
export const Notemodel = mongoose.model("Note", noteschema) //we write note single bec it will pluralize it
// also it still doesnt appeasr in DB until we make operation on it
