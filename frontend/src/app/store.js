import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import projectSlice from "../slices/projectSlice";
import taskSlice from "../slices/taskSlice";
import teamSlice from "../slices/teamSlice";
import memberSlice from "../slices/memberSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    project: projectSlice,
    tasks: taskSlice,
    teams: teamSlice,
    members: memberSlice,
  },
});
