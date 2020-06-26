import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get_recipe, clearRecipeState, deleteRecipe, editRecipe } from '../store/actions/recipes'
import { useHistory } from 'react-router-dom'
import Form from '../components/Form'
import Loader from '../components/Loader'

const Details = ({ match }) => {
    const isLogin = useSelector(state => !!state.auth.token)
    const recipe = useSelector(state => state.recipes.recipe)
    const loading = useSelector(state => state.recipes.loading)
    const dispatch = useDispatch()

    const history = useHistory()

    const [edited, setEdited] = useState(false)

    useEffect(() => {
        if (!recipe) {
            dispatch(get_recipe(match.params.id))
        }
        return () => {
            dispatch(clearRecipeState())
        }
        // eslint-disable-next-line
    }, [])

    const deleteHandler = () => {
        dispatch(deleteRecipe(match.params.id, history))
    }

    if (edited) {
        const edit = (id) => {
            return item => {
                dispatch(editRecipe(id, item, setEdited))
            }
        }

        return (
            <Form
                title={'Изменить'}
                recipe={recipe}
                action={edit(match.params.id)}
            >
                <button className='btn-small' onClick={setEdited.bind(null, false)}>Отмена</button>
            </Form>
        )
    }

    return (
        <div className="container-small">
            {
                loading?<Loader type={true}/>:
                recipe&& 
                <div className="row">
                    {
                        isLogin &&
                        <div className='col s12 control right-align'>
                            <button
                                className="btn-floating teal lighten-1 btn-small"
                                onClick={setEdited.bind(null, true)}
                                disabled={loading}
                            >
                                <i className="material-icons">edit</i>
                            </button>
                            &nbsp;
                                    <button
                                className="btn-floating red darken-1 btn-small"
                                onClick={deleteHandler}
                                disabled={loading}
                            >
                                <i className="material-icons">delete</i>
                            </button>
                        </div>
                    }
                    <div className="col s12 m8 l6 offset-m2 offset-l3 center-align">
                        <h3>{recipe.title}</h3>
                        <br />
                        <p><b>О РЕЦЕПТЕ</b></p>
                        <p className="withCarry">{recipe.description}</p>
                    </div>
                    <div className="col s11 m9 l8 xl6">
                        <p><b>ИНГРИДИЕНТЫ</b></p>
                        <ol className="collection">
                            {
                                recipe.ingredients.map(
                                    (item, i) => <li key={i} className="collection-item">{item}</li>
                                )
                            }
                        </ol>
                    </div>
                    <div className="col s12">
                        <p><b>ИНСТРУКЦИЯ ПРИГОТОВЛЕНИЯ</b></p>
                        <p className="guide withCarry">{recipe.instructions}</p>
                    </div>
                </div>
            }
        </div >
    )
}

export default Details