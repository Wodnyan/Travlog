import { InputReducerAction, FormInput } from "./types";

export function inputReducer(state: FormInput, action: InputReducerAction) {
  switch(action.type) {
    case "field":
      //Change username/password
      return {
        ...state,
        [action.field]: action.targetValue
      }
    case "login":
      //Login
      return {
        ...state,
      }
    case "signUp":
      //Sign up
      return {
        ...state,
      }
    case "loading":
      //Indicate to user that something is in process
      return {
        ...state,
      }
    case "error":
      console.log("error")
      //Handle Error
      return {
        ...state,
      }
    default:
      throw new Error("Something went wrong with the inputReducer");
  }
}
