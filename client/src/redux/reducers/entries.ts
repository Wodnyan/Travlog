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
    }
  | {
      type: "UPDATE_ENTRY";
      payload: {
        id: string;
        update: any;
      };
    };

export default function entriesReducer(state: State = [], action: Action) {
  switch (action.type) {
    case "ADD_ENTRY":
      return [...state, action.payload];
    case "REMOVE_ENTRY":
      const filteredList = state.filter(
        (entry: LogEntry) => entry._id !== action.payload
      );
      return filteredList;
    case "UPDATE_ENTRY":
      const changed = (state as LogEntry[]).map((entry) => {
        if (action.payload.id === entry._id) {
          const updatedEntry: LogEntry = {
            _id: action.payload.update._id,
            description: action.payload.update.description,
            title: action.payload.update.title,
            lat: action.payload.update.lat,
            lng: action.payload.update.long,
          };
          return updatedEntry;
        }
        return entry;
      });
      return changed;
    default:
      return state;
  }
}
