import { User, Notification, LogEntry } from "../types";

export const addUser = (user: User) => ({
  type: "ADD_USER",
  payload: user,
});

let notificationId = 0;

export const addNotification = (
  message: Notification["message"],
  type?: Notification["type"]
) => ({
  type: "ADD_NOTIFICATION",
  payload: {
    id: notificationId++,
    message,
    type: type,
  },
});

export const removeNotification = (id: number) => ({
  type: "REMOVE_NOTIFICATION",
  payload: {
    id,
  },
});

export const addEntry = (entry: LogEntry) => ({
  type: "ADD_ENTRY",
  payload: entry,
});
