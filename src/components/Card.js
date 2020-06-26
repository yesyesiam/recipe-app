import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({id=-1, title='Untitled', descrip = '...', ingred_n = 0}) => {
    let shortDecription = descrip

    if(descrip.length>28){
        shortDecription = descrip.substring(0, 25).trim().concat('...')
    }

    return (
        <div className="card grey lighten-4">
            <div className="card-content">
                <span className="card-title"><b>{title}</b></span>
                <p className='card-descrip'>
                    {shortDecription}
                </p>
                <br/>
                <p><strong>Ингредиенты:</strong>&nbsp;{ingred_n}</p>
            </div>
            <div className="card-action">
                <Link to={`/details/${id}`} className="btn">Подробнее...</Link>
            </div>
        </div>
    )
}

export default Card