import { model } from "mongoose";

//helper functions
export const create = async ({ model, data = [], options = {} } = {}) => {
  return await model.create(data, options); //model.create() creates multiple documents so data should be array
};

//createOne
export const createOne = async ({ model, data, options = {} } = {}) => {

  const [doc] = await model.create([data], options) || []  //were explicity saying "Treat this as the array form, but the array contains only ONE document.
  // "is to force the array form of Model.create() and then extract the one document from the returned array.
  //one doc so data should be obj
  return doc;
};

//findOne =>reusable database helper 
export const findOne = async ({// why async bec ,u are going to comm with mongo so it takes time to respond
  model,
  filter = {},
  select = "",
  options = {},
} = {}) => {
  let query = model.findOne(filter).select(select);//Mongoose query object.

  if (options.populate) { //"Did the caller request population?"
    query = query.populate(options.populate);
  }//populate() gives us the updated query

  if (options.lean) {
    query = query.lean();
  }

  return await query.exec();
};

//findById
export const findById = async ({
  id,
  options = {},
  select = "",
  model,
} = {}) => {
  let query = model.findById(id).select(select);

  if (options.populate) {
    query = query.populate(options.populate);
  }

  if (options.lean) {
    query = query.lean(options.lean);
  }

  return await query.exec();
};

//find
export const find = async ({
  filter = {},
  options = {},
  select = "",
  model,
} = {}) => {
  let query = model.find(filter).select(select);//.select() understands the string and converts/interprets it internally.

  if (options.populate) {
    query = query.populate(options.populate);
  }

  if (options.skip) {
    query = query.skip(options.skip);
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  if (options.lean) {
    query = query.lean(options.lean);
  }

  return await query.exec();
};

//insertMany
export const insertMany = async ({ data, model }) => {
  return await model.insertMany(data);
};

//updateOne
export const updateOne = async ({ filter, update, options, model } = {}) => {
  return await model.updateOne(
    filter || {},
    { ...update, $inc: { __v: 1 } },
    options,
  );
};

//findOneAndUpdate
export const findOneAndUpdate = async ({
  filter,
  update,
  options,
  model,
} = {}) => {
  return await model.findOneAndUpdate(
    filter || {},
    { ...update, $inc: { __v: 1 } },
    {
      new: true,
      runValidators: true,
      ...options,
    },
  );
};

//findByIdAndUpdate
export const findByIdAndUpdate = async ({
  model,
  id,
  update,
  options = { new: true },

} = {}) => {
  return await model.findByIdAndUpdate(
    id,
    update, options
  );
}; // bydefault runValidators is false so,like if u upt name with empty string it will be updated

//deleteOne
export const deleteOne = async ({ filter, model } = {}) => {
  return await model.deleteOne(filter || {});//there isnt option so u cant reurn the deletd doc like { returnDeleted: true }
}

//deleteMany
export const deleteMany = async ({ filter, model } = {}) => {
  return await model.deleteMany(filter || {});
};

// findOneAndDelete
export const findOneAndDelete = async ({
  filter,
  options = {},
  model,
} = {}) => {
  return await model.findOneAndDelete(filter || {}, options);
};
//findoneAndReplace
export const findOneAndReplace = async ({
  filter,
  replacement,
  options = {},
  model
} = {}) => {
  return await model.findOneAndReplace(
    filter,
    replacement,
    options
  );
};
//updatemMANy
export const UpdateMany = async({ model, filter,update, options={} }={})=> {
  const result= await model.updateMany( filter,update,options
  )// update many doesnt take obj{filter,..} xxx also it doesnt have select
  return result
}
//findoneAnddelete
export const findoneAnddelete=async({model,filter,options={}}={})=>{
  const res=await model.findOneAndDelete(filter,options)
  return res
}
//aggregation
export const aggregation=async({model,pipeline=[],options={}}= {} )=>{
const acc=await model.aggregate(pipeline,options)
return acc
}
