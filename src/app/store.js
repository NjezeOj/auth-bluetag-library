import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import categoriesReducer from '../features/category/categoriesSlice';
import policiesReducer from '../features/booklending/bookLendingSlice';
import booksReducer from '../features/books/booksSlice';
import usersReducer from '../features/User/UserSlice'
import lendBooksReducer from '../features/lendbook/lendBookSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    categories: categoriesReducer,
    policies: policiesReducer,
    books: booksReducer,
    users: usersReducer,
    lendbooks: lendBooksReducer

  }
});
