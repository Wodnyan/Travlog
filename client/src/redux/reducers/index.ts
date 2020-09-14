import { combineReducers } from "redux";

import user from "./user";
import notifications from "./notification";
import entries from "./entries";

export default combineReducers({ user, notifications, entries });
