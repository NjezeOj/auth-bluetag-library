import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    categories: [],
    status: 'idle',
    error: null
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get('http://localhost:5000/category/')
    return response.data;
})//payload creator callback function

export const addNewCategories = createAsyncThunk('categories/addNewCategories', 
async initialCategory => {    
    const response = await axios.post('http://localhost:5000/category/register', { category: initialCategory})
    return response.data
})


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        /*categoryAdded: {
            reducer(state, action){
                state.categories.push(action.payload)
            }, 
            prepare(category){
                return{
                    payload:{
                        //id: nanoid(),
                        category
                    } 
                }
            }
        }*/
    },
    extraReducers: {
        [fetchCategories.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.status = "succeeded"
            // Add any fetched posts to the array
            state.categories = state.categories.concat(action.payload)
        },
        [fetchCategories.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        },
        [addNewCategories.fulfilled]: (state, action) => {
            // Add the new post object to our posts array
            state.categories.push(action.payload)
        }
    }
})
    


//export const {categoryAdded} = categoriesSlice.actions

export default categoriesSlice.reducer

export const selectAllCategories = state => state.categories.categories




/**Remember: reducer functions must always create new state values immutably,
     *  by making copies! It's safe to call mutating functions
     * like Array.push() or modify object fields
     * like state.someField = someValue inside of createSlice(),
     * because it converts those mutations into safe immutable updates internally using the Immer library,
     * but don't try to mutate any data outside of createSlice! */

