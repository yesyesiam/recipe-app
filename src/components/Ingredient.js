import React, { useState } from 'react'

const Ingredient = ({ingr, Remove, Edit}) => {
    const [editable, setEditable] = useState(false)
    const [value, setValue] = useState('')

    const edit = ()=>{
        setEditable(!editable)
        setValue(ingr)
    }
    const onSubmit = (event) =>{
        if(event.key !== 'Enter'){
            return
        }
        Confirm()
    }
    const Confirm = ()=>{
        if(value.trim()){
            Edit(value)
            setEditable(false)
        }
    }
    
    return (
        <li className="collection-item">
            <div className="row valign-wrapper">
                <div className="col s12 ingr">
                    {
                        editable?
                        <input 
                            value={value}
                            type="text" 
                            placeholder="Ингридиент" 
                            autoFocus
                            onKeyPress={onSubmit}
                            onChange={event => setValue(event.target.value)}
                        />
                        : ingr
                    }
                </div>
                <div className="edit_tools">
                    {
                        editable?<i onClick={Confirm} className="material-icons">done</i>
                        :<i onClick={edit} className="material-icons">edit</i>
                    }
                    &nbsp;
                    {
                        editable?<i onClick={setEditable.bind(null, false)} className="material-icons">close</i>
                        :<i onClick={Remove} className="material-icons">delete</i>
                    }
                </div>
            </div>
        </li>
    )
}

export default Ingredient