import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewTask = createAsyncThunk(
  "project/addNewTask",
  async (projData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:4000/tasks",
      projData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response from rtk", response);
    return response.data;
  }
);
export const fetchTasks = createAsyncThunk(
  "project/fetchTasks",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:4000/tasks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response from rtk", response);
    return response.data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addNewTask.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewTask.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks.push(action.payload);
    });
    builder.addCase(addNewTask.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default taskSlice.reducer;
