import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {unwrapResult} from '@reduxjs/toolkit'
import { addNewUsers } from './UserSlice'

export const User = () => {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [regno, setRegNo] = useState('')
    const [department, setDepartment] = useState('')
    const [phoneno, setPhoneNo] = useState('')
    const [borrowertype, setBorrowerType] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch()
    
    const onSetName = (e) => setName(e.target.value)
    const onSetAddress = (e) => setAddress(e.target.value)
    const onSetRegNo = (e) => setRegNo(e.target.value)
    const onSetDepartment = (e) => setDepartment(e.target.value)
    const onSetPhoneNo = (e) => setPhoneNo(e.target.value)
    const onSetBorrowerType = (e) => setBorrowerType(e.target.value)

    const canSave = [name, address, regno, department, phoneno, borrowertype].every(Boolean) && addRequestStatus === 'idle'
    const borrowerTypes = ["Student", "Lecturer"]
    const user = {
        name: name,
        address: address,
        regno: regno,
        department: department,
        phoneno: phoneno,
        borrowertype: borrowertype,
        count: 0
    }
    const onSaveUserClicked = async (e) => {
        //e.preventDefault()
        
        if(canSave){
            try{
                setAddRequestStatus('pending')
                const resultAction = await dispatch(
                    addNewUsers(user)
                )
                unwrapResult(resultAction)
                setName('')
                setAddress('')
                setRegNo('')
                setDepartment('')
                setPhoneNo('')
                setBorrowerType('')

            } catch(err){
                console.log("user not save", err)
            }  finally{
                setAddRequestStatus('idle')
            }
        }

    }


    return(
        <div className="ml-40">
            <div className="bg-teal-400 text-white pt-2 pb-2">
                <p className="text-2xl pl-4">Register User</p>
            </div>
            <form className="pt-10 pl-4 pb-2 bg-gray-100 border-b-8">
                <div>
                    <label className="block font-bold pl-3" htmlFor="name">
                        Name
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onSetName}
                        type="text"
                        placeholder="Enter Name" />
                </div>

                <div className="pt-4">
                    <label className="block font-bold pl-3" htmlFor="address">
                        Address
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        value={address}
                        onChange={onSetAddress}
                        type="text"
                        placeholder="Enter Address" />
                </div>

                <div className="pt-4">
                    <label className="block font-bold pl-3" htmlFor="regno">
                        Registration Number
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="regno"
                        value={regno}
                        onChange={onSetRegNo}
                        type="text"
                        placeholder="Enter Registration Number" />
                </div>
                
                <div className="relative pt-4 w-2/5">
                    <label className="block font-bold pl-3" htmlFor="borrowertype">
                        BorrowerType
                    </label>
                    <select className="block appearance-none w-full border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="borrowertype"
                        id="borrowertype"
                        type="text"
                        value={borrowertype}
                        onChange={onSetBorrowerType}>
                        <option value="">Choose a BorrowerType</option>
                        {
                            borrowerTypes.map((element, index) => {
                                return <option key={index}>{element}</option>
                            })
                        }
                        
                    </select>

                    <div className="absolute right-0 ">
                        <svg className="text-black -mt-8 fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>

                <div className="pt-4">
                    <label className="block font-bold pl-3" htmlFor="department">
                        Department
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="department"
                        type="text"
                        value={department}
                        onChange={onSetDepartment}
                        placeholder="Enter Department" />
                </div>

                <div className="pt-4">
                    <label className="block font-bold pl-3" htmlFor="phoneno">
                        Phone Number
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phoneno"
                        type="text"
                        value={phoneno}
                        onChange={onSetPhoneNo}
                        placeholder="Enter Phone Number" />
                </div>

                <div className="pt-6">
                    <button onClick={onSaveUserClicked} className="border py-1 px-4 rounded focus:outline-none inline-flex items-center">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                        <span>Save</span>
                    </button>
                </div>
            </form>

        </div>

    )
}