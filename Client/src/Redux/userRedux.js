import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
      name:"user",
      initialState:{
        currentUser: null,
        isFetching: false,
        error: false,
      },

      reducers:{
        logingStart: (state) =>{
        state.isFetching= true;
        } ,    ///// we dont add action, since que are not sending anything at the  begining
        logingSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload ; /// basically our user
        },
        logingFailure: (state)=> {
            state.isFetching= false;
            state.error= true;
        },

        logout:(state)=> {
          state.currentUser = null;
          state.isFetching=false;
          state.error=false;
        },
      },

      
});

export const {logingStart, logingSuccess, logingFailure, logout} = userSlice.actions;

export default userSlice.reducer;