import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addRecipe } from '../store/actions/recipes'
import Form from '../components/Form'


const Add = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const add = (item) => {
        dispatch(addRecipe(item, history))
    }

    return (
        <Form 
            title='Добавить'
            action={add}
        />
    )
       
}

export default Add