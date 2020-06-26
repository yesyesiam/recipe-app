import React from 'react'
import './Pagination.css'

const Pagination = ({pageCount=0, changeHandler, currentPage=0}) => {
    const renderPages = ()=>{
        const pages = []
        for (let i = 0; i < pageCount; i++) {
            let inputClass = ''
            if(i===currentPage){
                inputClass = 'active'
            }
            pages.push(
                <li key={i} className={inputClass}>
                    <span 
                        onClick={()=>{changeHandler(i)}}
                    >
                        { i+1 }
                    </span>
                </li>
            )
        }
        return pages
    }

    return (
        <ul className="pagination">
            {renderPages()}
        </ul>
    )
}

export default Pagination