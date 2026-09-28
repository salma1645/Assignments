import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, min: [18,'min age should be gte:18 while u entered [VALUE]'], max: 60 },
  },
  {
    collection: "Users",
    timestamps: true,// by default false
    strict: false,//by default strict true wich mean not dynamic that only the wriiten field inside schema be saved
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    id:false,
    optimisticConcurrency: true,
  },
);
export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema); // LET us work with mongodb so ,later do operartion on model 

  // truevalidate: {
   // validator: function (value) {
     //   console.log({ value });
     //   if (value == "admin") {
      //      return false    //WHEN IT RETURN FALSE IT WILL GO TO THE MSG FUNC
      //  }
       // return true
   // },
    //message: function (prop) {
      //  console.log({ prop });
      // return `sorry curren enterd value isnt acc ${prop.value}`  ->If you want ${prop.value} to be replaced by its actual value, you need backticks `, not single or double quote