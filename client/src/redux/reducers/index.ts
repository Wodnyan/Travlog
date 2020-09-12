import { combineReducers } from "redux";

import user from "./user";
import notifications from "./notification";

export default combineReducers({ user, notifications });
