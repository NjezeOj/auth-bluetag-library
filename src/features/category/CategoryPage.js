import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {unwrapResult} from '@reduxjs/toolkit'
import { categoryAdded, addNewCategories } from './categoriesSlice'
//import { CategoriesList} from './CategoriesList'


export const CategoryPage = () => {
    const [category, setCategory] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    const canSave = [category].every(Boolean) && addRequestStatus === 'idle'
 
    const onSaveCategoryClicked = async (e) => {
        e.preventDefault()
        if(canSave){
            try{
                setAddRequestStatus('pending')
                const resultAction = await dispatch(
                    addNewCategories(category)
                )
                unwrapResult(resultAction)
                setCategory('')
            } catch(err){
                console.error('Failed to save the category: ', err)  
            } finally{
                setAddRequestStatus('idle')
            }
        }
        /*if (category){ when reducer and prepare callbacks are present
            dispatch(categoryAdded(category))
            setCategory('')
        }*/
    }
    const onCategoryChanged = e => setCategory(e.target.value)
    return(
        <>
        <div className="ml-40">
            <div className="bg-teal-400 text-white pt-2 pb-2">
                <p className="text-2xl pl-4">Create Book Category</p>
            </div>
            <form className="pt-2 pl-4 pb-2 bg-gray-100 border-b-8">
                <div>
                    <label className="block" htmlFor="category">
                        Category
                    </label>
                    <input className="appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="category" 
                        name="category" 
                        value={category} 
                        onChange={onCategoryChanged} 
                        type="text" 
                        placeholder="Enter Category Name" />
                </div>
                <div className="pt-6">
                    <button type="button" onClick={onSaveCategoryClicked} disabled={!canSave} className="border py-1 px-4 rounded focus:outline-none ">
                        Create
                    </button>
                </div>
            </form>
            <div className="mt-10 bg-gray-100 py-4">
                <div className="ml-16 pl-2 border-l-2 border-r-2 w-1/5">
                    Category
                </div> 
                <div className="border-b-2 border-teal-400 pb-4 pl-16">                                       
                </div>                
            </div>
            
        </div>
        
        </>
    )
}