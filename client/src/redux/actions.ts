import { User } from "../types";

export const addUser = (user: User) => ({
  type: "ADD_USER",
  payload: user,
});

let errorId = 0;

export const addError = (errorMessage: string) => ({
  type: "ADD_ERROR",
  payload: {
    id: errorId++,
    message: errorMessage,
  },
});

export const removeError = (errorId: number) => ({
  type: "REMOVE_ERROR",
  payload: {
    id: errorId,
  },
});
