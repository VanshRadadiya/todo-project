import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  task : [],
  task1 : [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    AddTask: (state,action) => {
      state.task.push(action.payload);
      state.task1.push(action.payload);
    },
    DeleteTask:(state, action)=>{
      state.task = state.task.filter((task,ind) => ind !== action.payload);
      state.task1 = state.task1.filter((task,ind) => ind !== action.payload);
    },
    UpdateTask: (state,action) => {
      const update = [...state.task];
      update.map((task,ind) =>{
        if(ind === action.payload.ind){
          task.title = action.payload.title;
          task.discription = action.payload.discription;
          task.date = action.payload.date;
        }
      })
      state.task=update;

      const update1 = state.task1.map((task,ind) =>{
        if(ind === action.payload.ind){
          task.title = action.payload.title;
          task.discription = action.payload.discription;
          task.date = action.payload.date;
        }
      })
      state.task1=update1;
    },
    UpdateStatus: (state,action) => {
      state.task = action.payload;
      state.task1 = action.payload;
      console.log(state.task);
    },
    CompleteTask: (state,action) => {
      const cdata = state.task1.filter((task,ind) => task.checked === true);
      state.task = cdata;
    },
    ProgressTask : (state,action) => {
      const pdata  = state.task1.filter((task,ind) => task.checked === false);
      state.task = pdata;
    },
    AllTask: (state,action) => {
      const all = [...state.task1];
      state.task = all;
    },
    UpdatePriority : (state,action) => {
      state.task = action.payload;
      state.task1 = action.payload;
      const sortedTasks = state.task1.sort((a, b) => (a.priority === b.priority ? 0 : a.priority ? -1 : 1));
      state.task = sortedTasks
    },
  }
})

// Action creators are generated for each case reducer function
export const { AddTask,DeleteTask,UpdateTask,UpdateStatus,CompleteTask,ProgressTask,AllTask,UpdatePriority } = counterSlice.actions

export default counterSlice.reducer