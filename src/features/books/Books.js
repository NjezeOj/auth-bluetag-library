import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RegisterPopUp} from '../PopUps/RegisterPopUp'
import Popup from 'reactjs-popup'
import { selectAllCategories, fetchCategories} from  '../category/categoriesSlice'
import {fetchBooks, selectAllBooks} from '../books/booksSlice'



export const Books = () => {
    const[category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [callnumber, setCallNumber] = useState('')
    const [book, setBook] = useState({})
    

    const onCategoryChanged = e => setCategory(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onAuthorChanged = e => setAuthor(e.target.value)
    const onCallNumberChanged = e => setCallNumber(e.target.value)
    
    const dispatch = useDispatch()
    
    const categories = useSelector(selectAllCategories)
    const books = useSelector(selectAllBooks)
    const categoryStatus = useSelector(state => state.categories.status)
    const bookStatus = useSelector(state => state.books.status)
    

    useEffect(() => {
        if (categoryStatus === 'idle' && bookStatus === 'idle' ) {
            dispatch(fetchCategories())
            dispatch(fetchBooks())
        }
    }, [categoryStatus, bookStatus, dispatch])

    const onSearchBooks = (e) => {
        e.preventDefault()       
        var bookObject = books.filter(el => el.title === title)
        return bookObject.length === 1 ? setBook(...bookObject) : console.log('Error')

    }

    return (       
            <>
                <div className="ml-40">
                    <div className="flex bg-teal-400 text-white py-4 pl-8">
                        <svg className="fill w-6 h-6" xmlns="http://ww..org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                        </svg>
                        <p className="text-2xl -mt-2">Filter</p>
                    </div>
                </div>
                <div className="ml-40 px-8 py-4 bg-gray-100 border-b-8 grid grid-cols-2  gap-4">
                    <div className="relative">
                        <label className="block" htmlFor="category">
                            Category
                        </label>
                        <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            name="category"
                            id="category"    
                            value={category}                                      
                            onChange={onCategoryChanged}>                            
                            <option value="">Choose Category</option>
                            {
                                categories.map(element => {
                                    return <option key={category._id}>{element.category}</option>
                                })
                            }
                        </select>
                        <div>
                            <svg className="text-black absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block" htmlFor="title">
                            Title
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="title"
                            name="tile"
                            value={title}
                            onChange={onTitleChanged}  
                            type="text" 
                            placeholder="" />
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block" htmlFor="author">
                            Author
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="author"
                            name="author"
                            value={author}
                            onChange={onAuthorChanged}   
                            type="text" 
                            placeholder="" />                        
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block" htmlFor="callnumber">
                            Call Number
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="callnumber" 
                            name="callnumber"
                            value={callnumber}
                            onChange={onCallNumberChanged}  
                            type="text" 
                            placeholder="" />
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                    </div>

                    <div className="pt-6">
                        
                    <button onClick= {onSearchBooks} className="border py-1 px-4 rounded focus:outline-none inline-flex items-center">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                        </svg>
                        <span>Search</span>
                    </button>
                    </div>                                      
                </div>
                <Popup modal trigger={<button className="ml-48 mt-4 border py-1 px-4 rounded focus:outline-none inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    <span>Register New Book</span>
                </button>}>{close => <RegisterPopUp close={close}/>}</Popup>


                
                
                <div className="ml-40 bg-gray-100 py-4">
                    <div className="grid grid-cols-8 divide-x divide-gray-400">
                        <div className="pl-2">
                            Category
                        </div>
                        <div className="pl-2">
                            Title
                        </div>
                        <div className="pl-2">
                            Author
                        </div>

                        <div className="pl-2">
                            Year Of Publication
                        </div>

                        <div className="pl-2">
                            Call Number
                        </div>

                        <div className="pl-2">
                            Volume
                        </div>

                        <div className="pl-2">
                            Size
                        </div>

                        <div className="pl-2">
                            Quantity
                        </div>                        
                    </div>
                    
                    <div className="border-b-2 border-teal-400 pb-4 pl-16">
                    </div>

                    <div className="grid grid-cols-8 divide-x divide-gray-400">
                        <div className="pl-2">
                            {book.category}
                        </div>
                        <div className="pl-2">
                            {book.title}
                        </div>
                        <div className="pl-2">
                            {book.author}
                        </div>
                        <div className="pl-2">
                            {book.pubyear}
                        </div>
                        <div className="pl-2">
                            {book.callnumber}
                        </div>
                        <div className="pl-2">
                            {book.volume}
                        </div>
                        <div className="pl-2">
                            {book.size}
                        </div>
                        <div className="pl-2">
                            {book.quantity}
                        </div>
                    </div>
                </div>
            </>
            
            
        

    )
}