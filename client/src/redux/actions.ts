import { User } from "../types";

export const addUser = (user: User) => ({
  type: "ADD_USER",
  payload: user,
});
