import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideAlert } from '../store/actions/recipes'

const Alert = () => {
    const dispatch = useDispatch()
    const alert = useSelector(state=> state.recipes.alert)

    if(!alert.visible){
        return null
    }

    let colorStyle = '#80cbc4'
    if(alert.type==='success'){
        colorStyle = '#4CAF50'
    } else if(alert.type==='error'){
        colorStyle = '#F44336'
    }

    return (
        <div className="alert" style={{background:colorStyle}}>
            <div>
                {alert.message}  
            </div>
            <div className="close" onClick={dispatch.bind(null, hideAlert())}>
                <i className="material-icons">close</i>
            </div>
        </div>
    )
}

export default Alert