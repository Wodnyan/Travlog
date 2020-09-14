import { InputReducerAction, FormInput } from "./types";

export function inputReducer(state: FormInput, action: InputReducerAction) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };
    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("Something went wrong with the inputReducer");
  }
}
