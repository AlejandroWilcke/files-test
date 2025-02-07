import { createSlice } from '@reduxjs/toolkit';

const filesSlice = createSlice({
  name: 'files',
  initialState: { value: [] },
  reducers: {
    setFiles: (state, action) => {
			state.value = action.payload;
		}
  },
});

export const { setFiles } = filesSlice.actions;

export default filesSlice.reducer;
