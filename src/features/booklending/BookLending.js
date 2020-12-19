import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchPolicies, addNewPolicies, selectAllPolicies} from './bookLendingSlice'
import {unwrapResult} from '@reduxjs/toolkit'
import axios from 'axios'


export const BookLending = () => {
    const [maxnobooksstudent, setMaxNoBooksStudent] = useState('')
    const [maxnobookslecturer, setMaxNoBooksLecturer] = useState('')
    const [maxnodaysstudent, setMaxNoDaysStudent] = useState('')
    const [maxnodayslecturer, setMaxNoDaysLecturer] = useState('')
    const [penaltystudent, setPenaltyStudent] = useState('')
    const [penaltylecturer, setPenaltyLecturer] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    
    const onSetMaxNoBooksStudent = e => setMaxNoBooksStudent(e.target.value)
    const onSetMaxNoBooksLecturers = e => setMaxNoBooksLecturer(e.target.value)
    const onMaxNoDaysStudent = e => setMaxNoDaysStudent(e.target.value)
    const onMaxNoDaysLecturer = e => setMaxNoDaysLecturer(e.target.value)
    const onPenaltyStudent = e => setPenaltyStudent(e.target.value)
    const onPenaltyLecturer = e => setPenaltyLecturer(e.target.value)

    const policies = useSelector(selectAllPolicies)
    const policyStatus = useSelector(state => state.policies.status)
    const dispatch = useDispatch()

    const canSave = [maxnobooksstudent, maxnobookslecturer, maxnodaysstudent, maxnodayslecturer, penaltystudent, penaltylecturer].every(Boolean) && addRequestStatus === 'idle'

    const policy = {
        maxnobooksstudent: maxnobooksstudent,
        maxnobookslecturer: maxnobookslecturer,
        maxnodaysstudent: maxnodaysstudent,
        maxnodayslecturer: maxnodayslecturer,
        penaltystudent: penaltystudent,
        penaltylecturer: penaltylecturer
    }
    
    useEffect(() => {
        if(policyStatus === 'idle'){
            dispatch(fetchPolicies())
        }        
    }, [policyStatus, dispatch])

    const onSavePolicy = async() => {
        if(canSave){
            try{
                //console.log(maxnobooksstudent, maxnobookslecturer, maxnodaysstudent, maxnodayslecturer, penaltystudent, penaltylecturer)
                setAddRequestStatus('pending')
                const resultAction = await dispatch(
                    addNewPolicies(policy)
                )

                unwrapResult(resultAction)

                setMaxNoBooksStudent('')
                setMaxNoBooksLecturer('')
                setMaxNoDaysStudent('')
                setMaxNoDaysLecturer('')
                setPenaltyStudent('')
                setPenaltyLecturer('')

                if(policies.length === 1){
                    axios.delete(`http://localhost:5000/booklending/${policies[0]._id}`)
                        .then(res => console.log(res.json));
                }
                
            } catch(err){
                console.log("Failed to save policy:" , err)
            }
            finally{
                setAddRequestStatus('idle')
            }
            
        }
    }

    return (
        <div className="ml-40">
            <div className="bg-teal-400 text-white pt-2 pb-2">
                <p className="text-2xl pl-4">Book Lending Policy</p>
            </div>
            <form className="pt-10 pl-4 pb-2 bg-gray-100 border-b-8">
                <div>
                    <label className="block font-bold pl-3" htmlFor="maxnobooksstudent">
                        Maximum Number Of Books - Students
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="maxnobooksstudent"
                        name="maxnobooksstudent" 
                        value={maxnobooksstudent}
                        onChange={onSetMaxNoBooksStudent}
                        type="number" 
                        placeholder="Enter Max Number of Books Per Time" />
                </div>

                <div className="pt-4">
                    <label className="block font-bold pl-3" htmlFor="maxnobookslecturer">
                        Maximum Number Of Books - Lecturers
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="maxnoofbookslecturer" 
                        value={maxnobookslecturer}
                        onChange={onSetMaxNoBooksLecturers}
                        type="number" 
                        placeholder="Enter Max Number of Books Per Time" />
                </div>

                <div className="pt-4">
                    <label className="block font-bold pl-3" htmlFor="maxnodaysstudent">
                        Maximum Number Of Days A Book Can Be Held - Students
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="maxnodaysstudent" 
                        value={maxnodaysstudent}
                        onChange={onMaxNoDaysStudent}
                        type="number" 
                        placeholder="Enter Max Number Of Days" />
                </div>

                <div className="pt-4">
                    <label className="block font-bold pl-3" htmlFor="maxnodayslecturer">
                        Maximum Number Of Days A Book Can Be Held - Lecturers
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="maxnodayslecturer" 
                        type="number" 
                        value={maxnodayslecturer}
                        onChange={onMaxNoDaysLecturer}
                        placeholder="Enter Max Number Of Days" />
                </div>

                <div className="pt-4">
                    <label className="block font-bold pl-3" htmlFor="penaltystudent">
                        Penalty-Students
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="penaltystudent" 
                        type="number" 
                        value={penaltystudent}
                        onChange={onPenaltyStudent}
                        placeholder="Enter Amount To Pay If Returned Late" />
                </div>

                <div className="pt-4">
                    <label className="block font-bold pl-3" htmlFor="penaltylecturer">
                        Penalty-Lecturers
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="penaltylecturer" 
                    type="number" 
                    value={penaltylecturer}
                    onChange={onPenaltyLecturer}
                    placeholder="Enter Amount To Pay If Returned Late" />
                </div>

                <div className="pt-6">
                    <button onClick={onSavePolicy} disabled={!canSave} className="border py-1 px-4 rounded focus:outline-none inline-flex items-center">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                        <span>Save</span>
                    </button>
                </div>
            </form>
            
        </div>

    )
}