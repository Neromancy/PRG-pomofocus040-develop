// src/redux/taskSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  activeTaskId: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload.text,
        est: Number(action.payload.est),
        act: 0,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setActiveTask: (state, action) => {
      state.activeTaskId = action.payload;
    },
    incrementActPomodoros: (state) => {
      if (state.activeTaskId) {
        const activeTask = state.tasks.find((t) => t.id === state.activeTaskId);
        if (activeTask && !activeTask.completed) {
          activeTask.act += 1;
        }
      }
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  setActiveTask,
  incrementActPomodoros,
} = tasksSlice.actions;

export default tasksSlice.reducer;