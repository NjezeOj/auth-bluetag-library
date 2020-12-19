import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    users: [],
    status: 'idle',
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('http://localhost:5000/user/')
    return response.data;
})//payload creator callback function

export const addNewUsers = createAsyncThunk('users/addNewUsers',
    async initialUser => {
        const response = await axios.post('http://localhost:5000/user/register', initialUser)
        return response.data
})



//write a lendbook slice


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = "succeeded"
            // Add any fetched posts to the array
            state.users = state.users.concat(action.payload)
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        },
        [addNewUsers.fulfilled]: (state, action) => {
            // Add the new post object to our posts array
            state.users.push(action.payload)
        }

    }
})



//export const {categoryAdded} = categoriesSlice.actions

export default usersSlice.reducer

export const selectAllUsers = state => state.users.users




/**Remember: reducer functions must always create new state values immutably,
     *  by making copies! It's safe to call mutating functions
     * like Array.push() or modify object fields
     * like state.someField = someValue inside of createSlice(),
     * because it converts those mutations into safe immutable updates internally using the Immer library,
     * but don't try to mutate any data outside of createSlice! */

