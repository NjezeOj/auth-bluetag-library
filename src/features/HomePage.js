import React from 'react';

export const HomePage = (props) => {

    const logout = () => {
        localStorage.removeItem('token')                
        props.history.push('/')
        window.location.reload()
    }

    if (!localStorage.getItem('token')) {
        props.history.push('/')
        
    }
    return (
        <>            
            <div>
                <div className="ml-40 bg-teal-400">
                    <button className="bg-white rounded" onClick={logout}>Sign Out</button>
                </div>
                
                <img class="background" src="https://images.unsplash.com/photo-1533285860212-c85e7140a408?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="libraryImage" />

            </div>
        </>

    )
}