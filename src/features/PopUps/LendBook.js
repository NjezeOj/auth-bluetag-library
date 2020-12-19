import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {selectAllUsers, fetchUsers} from '../User/UserSlice'
import {selectAllBooks, fetchBooks} from '../books/booksSlice'
import {selectAllPolicies, fetchPolicies} from '../booklending/bookLendingSlice'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


export const LendBook = ({ close }) => {
    
    const [callnumber, setCallNumber] = useState('')   
    const [regno, setRegNo] = useState('')
    const [returndate, setReturnDate] = useState(new Date())
    const [user, setUser] = useState({})
    const [book, setBook] = useState({})
    const [policy, setPolicy] = useState({})
       
    const [lenddate] = useState(new Date())   


    const dispatch = useDispatch()
    
    const users = useSelector(selectAllUsers)
    const books = useSelector(selectAllBooks)
    const policies = useSelector(selectAllPolicies)
    const userStatus = useSelector(state => state.users.status)
    const bookStatus = useSelector(state => state.books.status)
    const policyStatus = useSelector(state => state.policies.status )

    
    
    const onCallNumberChanged = e => setCallNumber(e.target.value)    
    const onSetReturnDate = (e) => setReturnDate(e.target.value)
    const onSetRegNo = (e) => setRegNo(e.target.value) 

    const onSearchCallNo = (e) => {
        e.preventDefault()
        var bookObject = books.filter(el => el.callnumber === callnumber)
        
        return bookObject.length === 1 ? setBook(...bookObject) : console.log('Error')
    } 

    const onSearchRegNo = (e) => {
        e.preventDefault()
        var userObject = users.filter(el => el.regno === regno)
            //write the axios.get
        return userObject.length === 1 ? setUser(...userObject) : console.log('Error')
    }
    
    useEffect(() => {
        if (userStatus === 'idle' && bookStatus === 'idle' && policyStatus === "idle" ) {
            dispatch(fetchUsers())
            dispatch(fetchBooks())
            dispatch(fetchPolicies())
        }
    }, [userStatus, policyStatus, bookStatus, dispatch])

    let lendbook = {
        category: book.category,

        title: book.title,

        callnumber: callnumber,

        author: book.author,

        pubyear: book.pubyear,

        volume: book.volume,

        size: book.size,

        expectedreturndate: returndate,

        lenddate: lenddate,

        returndate: lenddate,

        regno: regno,

        logtype: null,

        borrowertype: user.borrowertype,

        comments: null,

        penalty:null,

        defaulteddays: null,

        hasitbeenreturned: false

    }

    const hasbookbeenlended = {
        hasitbeenlended: true
    }



    const onLendBook = async (e) => {
        e.preventDefault()
        if ((user.borrowertype === 'Student' && user.count < policies[0].maxnobooksstudent) || (user.borrowertype === 'Lecturer' && user.count <= policies[0].maxnobookslecturer)){
            
            var count = user.count
            count++
            
            axios.post(`http://localhost:5000/user/lendbook/${user._id}`, lendbook)
                .then(res => console.log(res.data));

            axios.post(`http://localhost:5000/book/update/${book._id}`, hasbookbeenlended)
                .then(res => console.log(res.json))

            axios.post(`http://localhost:5000/user/count/${user._id}`, count)
                .then(res => console.log(res.data));

            
        } else {
            alert(`You Can't Lend More Books`)
        }

    }
    

    return (
        <>
            <div className="bg-white">
                <div className="flex justify-between bg-teal-400">
                    <div className="flex text-black py-4 pl-8">
                        <svg className="fill-current w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                        <p className="text-2xl -mt-2 font-bold">Lend Book</p>
                    </div>
                    <button className="focus:outline-none mr-8" onClick={close} >
                        <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="border-b-2 border-teal-400">
                </div>

                <form className="px-8 py-4 grid grid-cols-2 gap-4">
                    <div className="relative">
                        <label className="block font-bold" htmlFor="category">
                            Category
                        </label>
                        <input className="block appearance-none w-full border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="category"
                            id="category"
                            type="text"
                            value={book.category}
                            disabled
                            placeholder="Auto-Generated">
                        </input>
                    </div>

                    <div className="relative">
                        <label className="block font-bold" htmlFor="callnumber">
                            Call Number
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="callnumber"
                            name="callnumber"
                            value={callnumber}
                            onChange={onCallNumberChanged}
                            type="text"
                            placeholder="Search CallNumber" />
                        <button onClick={onSearchCallNo} class="absolute right-0 mr-2 mt-2 focus:outline-none">
                            <svg className="fill-current text-teal-400 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                            </svg>                            
                        </button>                        
                    </div>

                    <div className="relative">
                        <label className="block font-bold" htmlFor="yearofpublication">
                            Year Of Publication
                    </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="pubyear"
                            name="pubyear"
                            value={book.pubyear}
                            type="number" 
                            placeholder="Auto-Generated" 
                            disabled/>
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block font-bold" htmlFor="title">
                            Title
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="title"
                            name="title"
                            value={book.title}
                            type="text" 
                            placeholder="Auto-Generated" 
                            disabled/>
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block font-bold" htmlFor="volume">
                            Volume
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="volume"
                            name="volume"
                            value={book.volume}
                            type="text"
                            placeholder="Auto-Generated" 
                            disabled/>
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                    </div>
                   
                    <div className="relative">
                        <label className="block font-bold" htmlFor="author">
                            Author
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="author"
                            name="author"
                            value={book.author}
                            type="text"
                            placeholder="Auto-Generated" 
                            disabled/>
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block font-bold" htmlFor="size">
                            Size
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="size"
                            name="size"
                            value={book.size}
                            type="text" 
                            placeholder="Auto-Generated" 
                            disabled/>
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block font-bold" htmlFor="regno">
                            Student Reg/Staff Number
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="regno"
                            value={regno}
                            onChange={onSetRegNo}
                            type="text"
                            placeholder="Search ID. Number" />
                        
                        <button onClick={onSearchRegNo} class="absolute right-0 mr-2 mt-2 focus:outline-none">
                            <svg className="fill-current text-teal-400 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                            </svg>
                        </button>     
                    </div>

                    <div className="relative">
                        <label className="block font-bold" htmlFor="name">
                            Name
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="name"
                            name="name"
                            value={user.name}
                            disabled
                            type="text"
                            placeholder="Auto-Generated" />
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div className="relative font-bold">
                        <label className="block" htmlFor="department">
                            Department
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="department"
                            type="text"
                            value={user.department}
                            disabled
                            placeholder="Auto-Generated" />
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block font-bold" htmlFor="phoneno">
                            Phone Number
                        </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="phoneno"
                            type="text"
                            disabled
                            value={user.phoneno}
                            placeholder="Auto-Generated" />
                        <svg className="text-teal-400 absolute right-0 mr-2 -mt-8 fill-current w-6 h-6"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                    </div>

                    <div className="relative">
                        <label className="block font-bold" htmlFor="duedateofreturn">
                            Due Date Of Return
                        </label>
                        <DatePicker
                            selected={returndate}
                            onchange={onSetReturnDate}
                        />
                    </div>
                    <div></div>

                    <div className="flex justify-end right-0 pt-6">
                        <button className="border py-1 px-4 rounded focus:outline-none">
                            <span>Cancel</span>
                        </button>

                        <button onClick={onLendBook} className="border py-1 px-4 rounded focus:outline-none inline-flex items-center">
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                            <span>Lend Book</span>
                        </button>
                    </div>
                </form>

                <div className="border-b-2 border-teal-400">
                </div>
            </div>
        </>

    )
}