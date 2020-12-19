import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {fetchUsers,selectAllUsers} from '../User/UserSlice'
import { selectAllBooks, fetchBooks} from '../books/booksSlice'
import { useDispatch, useSelector } from 'react-redux'


export const ReturnBook = ({ close }) => {
    const [lentbooks, setLentBooks] = useState([])
    const [regno, setRegNo] = useState("")
    const [user, setUser] = useState({})
    const onSetRegNo = e => setRegNo(e.target.value)

    const dispatch = useDispatch()

    const users = useSelector(selectAllUsers)
    const books = useSelector(selectAllBooks)
    const usersStatus = useSelector(state => state.users.status)
    const bookStatus = useSelector(state => state.books.status)
    

    useEffect(() => {
        if (usersStatus === "idle" && bookStatus === "idle"){
            dispatch(fetchUsers())
            dispatch(fetchBooks())
        }           
    }, [usersStatus, bookStatus, dispatch]) 

    const searchRegNo = async (e) => {
        e.preventDefault()
        
        const userObject = users.filter(user => user.regno === regno)

        return userObject.length === 1 ? setUser(...userObject) : console.log('Error')        
        
    }

    const getLentBooks = async(e) => {
        e.preventDefault()
        axios.get(`http://localhost:5000/user/oneuser/${user._id}`)
            .then( res => {
                var books = res.data.bookdescription
                setLentBooks(books)
                //console.log(lentbooks)
            })
    }

    const onSelectLentBook = (e) => {
        lentbooks.forEach(lentbook => {
            if(lentbook.title === e.target.value){
                lentbook.hasitbeenreturned = e.target.checked                
            }    
            
        })
        //console.log(lentbooks)
    }

    const hasbookbeenlended = {
        hasitbeenlended: false
    }

    const onReturnBook = (e) => {
        e.preventDefault()

        lentbooks.forEach(lentbook => {


            const lendBookId = {
                id: lentbook._id
            }
            
            const bookObject = books.filter(book => book.title === lentbook.title)
            var book = [...bookObject]
                       

            if(lentbook.hasitbeenreturned){
                axios.post(`http://localhost:5000/user/${user._id}`, lendBookId)
                    .then(res => console.log(res.json));

                axios.delete(`http://localhost:5000/lendbook/${lentbook._id}`)
                    .then(res => console.log(res.json));

                axios.post(`http://localhost:5000/book/update/${book[0]._id}`, hasbookbeenlended)
                    .then(res => console.log(res.json))
            }
        })
    }

    const bookList = lentbooks.map(lentbook => (
        <label className="flex justify-start items-start mt-2" key={lentbook._id}>
            <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                <input
                    onClick={onSelectLentBook}
                    type="checkbox"
                    value={lentbook.title}                    
                    className="opacity-0 absolute"></input>
                <svg className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
            </div>
            <div className="select-none">{lentbook.title}</div>
        </label>
    
    ))

    
    return (
        <>
            <div class="bg-gray-100">
                <div className="flex justify-between bg-teal-400">
                    <div className="flex text-black py-4 pl-8">
                        <p className="text-2xl -mt-2 font-bold">Return Books</p>
                    </div>
                    <button className="focus:outline-none mr-8" onClick={close} >
                        <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="border-b-2 border-teal-400">
                </div>

                <form className="px-8 py-4 bg-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="block font-bold" htmlFor="regno">
                                Student Reg/Staff Number
                        </label>
                            <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="regno" 
                                type="text" 
                                value={regno}
                                onChange = {onSetRegNo}
                                placeholder="Input RegNo." />
                            <button onClick={searchRegNo} class="absolute right-0 mr-2 mt-2 focus:outline-none">
                                <svg className="fill-current text-teal-400 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                                </svg>
                            </button>   
                        </div>

                        <div className="relative">
                            <label className="block font-bold" htmlFor="address">
                                Address
                        </label>
                            <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                disabled 
                                id="address" 
                                type="text" 
                                value={user.address}
                                placeholder="" />
                            <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </div>

                        <div className="relative">
                            <label className="block font-bold" htmlFor="name">
                                Name
                        </label>
                            <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                disabled 
                                id="name" 
                                type="text" 
                                value={user.name}
                                placeholder="" />
                            <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                            </svg>
                        </div>

                        <div className="relative">
                            <label className="block font-bold" htmlFor="phoneno">
                                Phone Number
                        </label>
                            <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                disabled 
                                id="phoneno" 
                                type="text" 
                                value={user.phoneno}
                                placeholder="" />
                            <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </div>

                        <div className="relative">
                            <label className="block font-bold" htmlFor="department">
                                Department
                            </label>
                            <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                disabled 
                                id="department" 
                                type="text" 
                                value={user.department}
                                placeholder="" />
                            <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                        </div>
                    </div>

                    <button onClick={getLentBooks} className="mt-6 border py-1 px-4 rounded focus:outline-none">
                        <span>Get Lent Books</span>
                    </button>

                    <div className="mt-5">
                        <p className="pb-1 font-bold">Book Description</p>
                        {bookList}
                    </div>
                    
                    <button onClick={onReturnBook} className="mt-6 border py-1 px-4 rounded focus:outline-none">
                        <span>Return</span>
                    </button>
                    
                </form>
                
                <div className="border-b-2 border-teal-400">
                </div>
            </div>
        </>






    )
}