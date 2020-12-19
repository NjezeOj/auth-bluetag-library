import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { selectAllCategories, fetchCategories } from './categoriesSlice'

export const CategoriesList = () => {
    const dispatch = useDispatch()
    const categories = useSelector(selectAllCategories)

    const categoryStatus = useSelector(state => state.categories.status)

    useEffect(() => {
        if(categoryStatus === 'idle'){
            dispatch(fetchCategories())
        }
    }, [categoryStatus, dispatch])
    const renderedCategories = categories.map( category => (
        <article key={category._id}>
            <h3>{category.category}</h3>    
        </article>
    ))

    return (
        <section>
            <h2>Categories</h2>
            
            {renderedCategories}
        </section>
    )
}