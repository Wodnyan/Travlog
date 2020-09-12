import { ErrorMessage } from "../../types";

type Action =
  | {
      type: "ADD_ERROR";
      payload: ErrorMessage;
    }
  | {
      type: "REMOVE_ERROR";
      payload: {
        id: number;
      };
    };

export default function errorReducer(
  state: [] | ErrorMessage[] = [],
  action: Action
) {
  switch (action.type) {
    case "ADD_ERROR":
      return [...state, action.payload];
    case "REMOVE_ERROR":
      const filteredArray = state.filter(
        (error: ErrorMessage) => error.id !== action.payload.id
      );
      return [...filteredArray];
    default:
      return state;
  }
}
