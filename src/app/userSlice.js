import userApi from "api/userApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit"); 

export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {  
  // thunkAPI.dispatch(...)
  const currentUser = await userApi.getMe();
  return currentUser; // return casi gi thi action.payload nhan dc cai do
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    // loading:false,
    // error:'',
  },

  reducers: {},
  extraReducers: { 
    // [getMe.pending]: (state) => {   //khi bat dau
    //   state.loading = true;
    // },
    // [getMe.rejected]: (state,action) => {   // khi co error
    //   state.loading = true;
    //   state.error = action.error;
    // },
    [getMe.fulfilled]: (state, action) => {   
      state.current = action.payload;
    },
  }
});

const { reducer: userReducer } = userSlice;
export default userReducer;