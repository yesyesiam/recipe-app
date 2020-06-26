import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../store/actions/recipes'
import IngredientsList from './IngredietsList'
import Loader from './Loader'

const Form = ({recipe, children, title='Action', action})=>{
    const dispatch = useDispatch()
    const loading = useSelector(state => state.recipes.loading)
    const [state, setState] = useState({
        title: {value: '', isValid: false},
        description: {value:'', isValid: false},
        instructions: {value:'', isValid: false},
    })

    const [ingredients, setIngrs] = useState([])

    useEffect(()=>{
        if(recipe){
            setState({
                title: {value: recipe.title, isValid: true},
                description: {value: recipe.description, isValid: true},
                instructions: {value: recipe.instructions, isValid: true},
            })
            setIngrs(recipe.ingredients)
        }
    }, [recipe])

    const validateControl = (value)=>{
        if(value.length<3){
            return false
        }
        return true
    }

    const handleInputChange = (event)=> {
        const name = event.target.name
        const value = event.target.value

        setState({
            ...state, 
            [name]: {
                value, 
                isValid: validateControl(event.target.value)
            }
        })
    }

    const validateForm = ()=>{
        let isFormValid = true
        Object.keys(state).forEach(name=>{
            isFormValid = state[name].isValid && isFormValid
        })
        isFormValid= ingredients.length>0 && isFormValid

        if(!isFormValid){
            dispatch(showAlert('Заполните все поля','error'))
        }
        return isFormValid
    }

    const actionHandler = ()=>{
        if(validateForm()){
            const item = {
                title: state.title.value,
                description: state.description.value,
                instructions: state.instructions.value,
                ingredients
            }
            action(item)
        }
    }

    return(
        <div className='add'>
            <h3>{title}</h3>
            <div className='row'>
                <div className="input-field col s6">
                    <input 
                        type="text" 
                        placeholder="название рецепта"
                        name = "title"
                        value={state.title.value}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="last_name" className="active">Название</label>
                </div>
                <div className="input-field col s12">
                    <textarea 
                        placeholder="о рецепте" 
                        className="materialize-textarea custom_t"
                        name = "description"
                        value={state.description.value}
                        onChange={handleInputChange} 
                    />
                    <label htmlFor="textarea1" className="active">О рецепте</label>
                </div>
                <div className="col s12">
                    <IngredientsList ingrs={ingredients} setIngrs={setIngrs} />
                </div>
                <div className="input-field col s12">
                    <textarea 
                        placeholder="инструкция приготовления" 
                        className="materialize-textarea custom_t"
                        name = "instructions"
                        value={state.instructions.value}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="textarea1" className="active">Инструкция приготовления</label>
                </div>
                <div className='col s12 right-align'>
                    {
                        loading?<Loader />
                        :
                        <>
                            {children}
                            &nbsp;
                            <button className='btn green' onClick={actionHandler}>
                                {title}
                            </button>
                        </>
                    }
                </div> 
            </div>
        </div>
    )
}

export default Form