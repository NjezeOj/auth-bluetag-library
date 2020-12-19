import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectAllCategories, fetchCategories} from '../category/categoriesSlice'
import {addNewBooks} from '../books/booksSlice'
import {unwrapResult} from '@reduxjs/toolkit'

export const RegisterPopUp = ({close}) => {
    const dispatch = useDispatch()

    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [callnumber, setCallNumber] = useState('')
    const [author, setAuthor] = useState('')
    const [pubyear, setPubYear] = useState('')
    const [volume, setVolume] = useState('')
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState('')
    

    const onCategoryChanged = e => setCategory(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onCallNumberChanged = e => setCallNumber(e.target.value)  
    const onAuthorChanged = e => setAuthor(e.target.value)
    const onPubYearChanged = e => setPubYear(e.target.value)  
    const onVolumeChanged = e => setVolume(e.target.value)
    const onSizeChanged = e => setSize(e.target.value)
    const onQuantityChanged = e => setQuantity(e.target.value)

    const categories = useSelector(selectAllCategories)
    const categoryStatus = useSelector(state => state.categories.status)

    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(fetchCategories())
        }
    }, [categoryStatus, dispatch])

    const book = {
        category: category ,

        title: title,

        callnumber: callnumber,

        author: author,

        pubyear: pubyear,

        volume: volume,

        size: size,

        quantity: quantity,

        hasitbeenlended: false

    }

    const onSaveBookClicked = async (e) => {
        e.preventDefault()
       
        try {
            const resultAction = await dispatch(                
                addNewBooks(book)
            )
            unwrapResult(resultAction)
            setCategory('')
            setTitle('')
            setCallNumber('')
            setAuthor('')
            setPubYear('')
            setVolume('')
            setSize('')
            setQuantity('')            
        } catch (err) {
            console.error("Failed to Save Book", err);
        }         
    }

    return (
        <>
            <div className="bg-white">
                <div className="flex justify-between">
                    <div className="flex text-black py-4 pl-8">
                        <svg className="fill-current w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                        <p className="text-2xl -mt-2">Register Books</p>
                    </div>
                    <button class="focus:outline-none mr-8" onClick={close} >
                        <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="border-b-2 border-teal-400">
                </div>

                <form className="px-8 py-4 grid grid-cols-2 gap-4">
                    <div className="relative">
                        <label className="block" htmlFor="category">
                            Category
                        </label>
                        <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            name="category"
                            id="category"
                            type="text"
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
                        <label className="block" htmlFor="yearofpublication">
                            Year Of Publication
                    </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="pubyear" 
                            name="pubyear"
                            value={pubyear}
                            onChange={onPubYearChanged}
                            type="number" 
                            placeholder="" />
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block" htmlFor="title">
                            Title
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="title"
                            name="title"
                            value={title}
                            onChange={onTitleChanged} 
                            type="text" 
                            placeholder="" />
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block" htmlFor="volume">
                            Volume
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="volume"
                            name="volume"
                            value={volume}
                            onChange={onVolumeChanged} 
                            type="text" 
                            placeholder="" />
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
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
                            type="number" 
                            placeholder="" />
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block" htmlFor="size">
                            Size
                    </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="size"
                            name="size"
                            value={size}
                            onChange={onSizeChanged} 
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
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block" htmlFor="quantity">
                            Quantity
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="quantity" 
                            name="quantity"
                            value={quantity}
                            onChange={onQuantityChanged} 
                            type="number" 
                            placeholder="" />
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                    </div>
                    <div></div>

                    <div className="flex justify-end right-0 pt-6">
                        <button className="border py-1 px-4 rounded focus:outline-none">
                            <span>Cancel</span>
                        </button>

                        <button onClick= {onSaveBookClicked}  className="border py-1 px-4 rounded focus:outline-none inline-flex items-center">
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                            <span>Save</span>
                        </button>
                    </div>
                </form>

                <div className="border-b-2 border-teal-400">
                </div>
            </div>
        </>






    )
}