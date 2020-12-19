import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    lendbooks: [],
    status: 'idle',
    error: null
}

export const fetchLendBooks = createAsyncThunk('lendbooks/fetchLendBooks', async () => {
    const response = await axios.get('http://localhost:5000/lendbook/')
    return response.data;
})//payload creator callback function




const lendBooksSlice = createSlice({
    name: 'lendbooks',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchLendBooks.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchLendBooks.fulfilled]: (state, action) => {
            state.status = "succeeded"
            // Add any fetched posts to the array
            state.lendbooks = state.lendbooks.concat(action.payload)
        },
        [fetchLendBooks.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        }
    }
})



//export const {categoryAdded} = categoriesSlice.actions

export default lendBooksSlice.reducer

export const selectAllLendBooks = state => state.lendbooks.lendbooks




/**Remember: reducer functions must always create new state values immutably,
     *  by making copies! It's safe to call mutating functions
     * like Array.push() or modify object fields
     * like state.someField = someValue inside of createSlice(),
     * because it converts those mutations into safe immutable updates internally using the Immer library,
     * but don't try to mutate any data outside of createSlice! */

