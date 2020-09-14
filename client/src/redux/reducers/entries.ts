import { LogEntry } from "../../types";

type State = [] | LogEntry[];

type Action =
  | {
      type: "ADD_ENTRY";
      payload: LogEntry;
    }
  | {
      type: "REMOVE_ENTRY";
      payload: LogEntry["_id"];
    };

export default function entriesReducer(state: State = [], action: Action) {
  switch (action.type) {
    case "ADD_ENTRY":
      return [...state, action.payload];
    case "REMOVE_ENTRY":
      const filteredList = state.filter(
        (entry: LogEntry) => entry._id !== action.payload
      );
      return [...filteredList];
    default:
      return state;
  }
}
