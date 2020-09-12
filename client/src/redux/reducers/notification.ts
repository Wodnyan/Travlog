import { Notification } from "../../types";

type Action =
  | {
      type: "ADD_NOTIFICATION";
      payload: Notification;
    }
  | {
      type: "REMOVE_NOTIFICATION";
      payload: {
        id: number;
      };
    };

export default function notificationReducer(
  state: [] | Notification[] = [],
  action: Action
) {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...state, action.payload];
    case "REMOVE_NOTIFICATION":
      const filteredArray = state.filter(
        (notification: Notification) => notification.id !== action.payload.id
      );
      return [...filteredArray];
    default:
      return state;
  }
}
