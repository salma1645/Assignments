import { findOne, createOne } from "../../common/repository/db.repository.js";
import { UserModel } from "../../DB/model/index.js";
export const signup = async (inputs) => {
  const account = await findOne({
    model: UserModel,
    filter: { email: inputs.email },
  });
  if (account) {
    throw new Error("Email Exist", { cause: { status: 409 } });
  }

  const user = await createOne({ model: UserModel, data: inputs, options: {} });
  return user;
};


export const login = async ({ email, password }) => {
  const account = await findOne({
    model: UserModel,
    filter: { email, password },
  }); 
  if (!account) {
    throw new Error("Invalid login data", { cause: { status: 400 } });
  }

  return account;
};
