import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  task: [],
  task1: [],
  All: [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // ------------------- Add Task -----------------------//
    AddTask: (state, action) => {
      state.task.push(action.payload);
      state.task1.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify([...state.task]));
    },
    // ------------------ Remove Task ----------------------//
    DeleteTask: (state, action) => {
      state.task = state.task.filter((task, ind) => ind !== action.payload);
      state.task1 = state.task1.filter((task, ind) => ind !== action.payload);
      localStorage.setItem('tasks', JSON.stringify([...state.task]));
    },
    // ------------------ Update Task ----------------------//
    UpdateTask: (state, action) => {
      const update = [...state.task];
      update.map((task, ind) => {
        if (ind === action.payload.ind) {
          task.title = action.payload.title;
          task.discription = action.payload.discription;
          task.date = action.payload.date;
        }
      })
      state.task = update;
      localStorage.setItem('tasks', JSON.stringify([...state.task]));


      const update1 = state.task1.map((task, ind) => {
        if (ind === action.payload.ind) {
          task.title = action.payload.title;
          task.discription = action.payload.discription;
          task.date = action.payload.date;
        }
      })
      state.task1 = update1;
    },
    // ---------------- Set Visibility Filter ----------------------//
    UpdateStatus: (state, action) => {
      state.task = action.payload;
      state.task1 = action.payload;
      console.log(state.task);
      localStorage.setItem('tasks', JSON.stringify([...state.task]));
    },
    CompleteTask: (state, action) => {
      var cdata = JSON.parse(localStorage.getItem('tasks'));
      state.task = cdata.filter((task, ind) => task.checked === true);
    },
    ProgressTask: (state, action) => {
      var pdata = JSON.parse(localStorage.getItem('tasks'));
      state.task = pdata.filter((task, ind) => task.checked === false);

    },
    AllTask: (state, action) => {
      var all = JSON.parse(localStorage.getItem('tasks'));
      state.task = all;
    },
    // ------------------ Update Priority ----------------------//
    UpdatePriority: (state, action) => {
      state.task = action.payload;
      state.task1 = action.payload;
      const sortedTasks = state.task1.sort((a, b) => (a.priority === b.priority ? 0 : a.priority ? -1 : 1));
      state.task = sortedTasks
      localStorage.setItem('tasks', JSON.stringify([...state.task]));
    },
  // ---------------- Old Data Of Local Storage ------------------//
    oldData: (state,action) => {
      const oldData = localStorage.getItem('tasks');
      if (oldData) {
        state.task = (JSON.parse(oldData));
        // console.log(state.task);
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { AddTask, DeleteTask,oldData, UpdateTask, UpdateStatus, CompleteTask, ProgressTask, AllTask, UpdatePriority } = counterSlice.actions

export default counterSlice.reducer