import React from 'react'
import Ingredient from './Ingredient'

const IngredientsList = ({ingrs, setIngrs}) => {
    const Add = ()=>{
        const tmp = [...ingrs,'New']
        setIngrs(tmp)
    }
    const Remove = (id)=>{
        const tmp = ingrs.filter((ingr, i)=> i!==id)
        setIngrs(tmp)
    }
    const Edit = (id)=>{
        return (word)=>{
            const tmp = [...ingrs]
            tmp[id] = word
            setIngrs(tmp)
        }
    }
    //console.log(ingrs)
    return (
        <ul className="collection">
            {
                ingrs.map((ingr, i)=> 
                    <Ingredient
                        key={i}
                        ingr={ingr}
                        Remove = {Remove.bind(null, i)}
                        Edit = {Edit(i)}
                    />
                )
            }
            
            
            <li className="collection-item center-align">
                <button 
                    className="btn-floating btn-small red"
                    onClick={Add}
                >
                    <i className="material-icons">add</i>
                </button>
            </li>
        </ul>
    )
}

export default IngredientsList