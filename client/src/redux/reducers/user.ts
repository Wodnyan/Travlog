import { User } from "../../types";

const initState = null;

type Action =
  | {
      type: "ADD_USER";
      payload: User;
    }
  | {
      type: "REMOVE_USER";
    };

export default function userReducer(
  state: User | null = initState,
  action: Action
) {
  switch (action.type) {
    case "ADD_USER":
      return action.payload;
    case "REMOVE_USER":
      return null;
    default:
      return state;
  }
}
