import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export const Login = (props) => {

    
    const [regno, setRegNo] = useState('')
    const [password, setPassword] = useState('')
    
    const onSetRegNo = (e) => setRegNo(e.target.value)
    const onSetPassword = (e) => setPassword(e.target.value)

    const canSave = [ regno, password].every(Boolean)

    /*const user = {
        
        regno: regno,
        password: password

    }*/
    const onSaveUserClicked = async (e) => {
        e.preventDefault()

        if (canSave) {
            try {

                const res = await axios.post(
                    'http://localhost:5000/user/login',
                    {regno, password},
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                );
                localStorage.setItem('token', res.data.token)
                props.history.push('/home')


            } catch (err) {
                alert("Wrong Password or UserName")
                console.log("error:", err.response.data.error )
            }
        }

    }


    return (
        <div>
            <div className="bg-teal-400 text-white pt-2 pb-2">
                <p className="text-2xl pl-4">Register User</p>
                
            </div>
            <form className="pt-5 pl-4 pb-2 bg-gray-100 border-b-8">
                
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

                <div className="pt-4">
                    <label className="block font-bold pl-3" htmlFor="password">
                        Password
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phoneno"
                        type="password"
                        value={password}
                        onChange={onSetPassword}
                        placeholder="Enter Password" />
                </div>

                <div className="pt-6">
                    <button onClick={onSaveUserClicked} className="border py-1 px-4 rounded focus:outline-none inline-flex items-center">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                        <span>Login</span>
                    </button>
                </div>

                <div className="mt-5">
                    <p className="text-blue-400"> <Link to="/register">Register Here</Link> </p>
                </div>
            </form>

        </div>

    )
}