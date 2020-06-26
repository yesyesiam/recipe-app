import C from "../actionsTypes"

const url = 'https://cookingrecipes-b26f5.firebaseio.com'

export function editRecipe(id, item, next){
    return (dispatch, getState) => {
        dispatch(showLoader())
        fetch(`${url}/recipes/${id}.json?auth=${getState().auth.token}`,
            {
                method: 'PUT',
                body: JSON.stringify(item)
            }
        ).then(res=>{
            if(!res.ok) throw Error(res.statusText)
            dispatch(changeRecipe({...item, id}))
            next(false)
        })
        .catch((e)=>dispatch(reqResults(e.message, 'error')))
    }
}

export function deleteRecipe(id, history){
    return (dispatch, getState) => {
        dispatch(showLoader())
        fetch(`${url}/recipes/${id}.json?auth=${getState().auth.token}`,
            {
                method: 'DELETE'    
            }
        ).then(res=>{
            if(!res.ok) throw Error(res.statusText)
            dispatch(changeRecipe(null, 'Удалено.'))
            if(history) history.replace('/')
        })
        .catch((e)=>dispatch(reqResults(e.message, 'error')))
    }
}

export function addRecipe(item, history){
    return (dispatch, getState) => {
        dispatch(showLoader())
        fetch(`${url}/recipes.json?auth=${getState().auth.token}`,
            {
                method: 'POST',
                body: JSON.stringify(item)
            }
        ).then(res => {
            if(!res.ok) throw Error(res.statusText)
            return res.json()
        })
        .then(r=>{
            dispatch(changeRecipe({...item, id: r.name}, 'Добавлено', 'success', true))
            if(history) history.push(`/details/${r.name}`)
        })
        .catch((e)=>{
            dispatch(reqResults(e.message, 'error'))
        })
    }
}

export function getKeys(limit=2){
    return (dispatch, getState) => {
        dispatch(showLoader())
        fetch(`${url}/recipes.json?shallow=true`)
        .then(res=> {
            if(!res.ok) throw Error(res.statusText)
            return res.json()
        })
        .then(items=>{
            const keys = Object.keys(items||[]).sort()
            dispatch({type:C.GET_KEYS, keys})
            let pageIndex = getState().recipes.currentPage
            if(pageIndex===null||pageIndex>Math.ceil((keys.length/limit)-1)){
                pageIndex = Math.ceil((keys.length/limit)-1)
                dispatch(changePage(pageIndex))
            }
            dispatch(get_recipes(keys[pageIndex*limit], limit))
        })
        .catch(e=>dispatch(reqResults(e.message, 'error')))
    }
}

export function changePage(index){
    return{type: C.CHANGE_PAGE, index}
}

export function get_recipes(start='', limit=2){
    return dispatch => {
        dispatch(showLoader())
        fetch(`${url}/recipes.json?orderBy="$key"&startAt="${start}"&limitToFirst=${limit}`)
        .then(res=> {
            if(!res.ok) throw Error(res.statusText)
            return res.json()
        })
        .then(items=>{
            const recipes = Object.keys(items||[]).map((key)=>{
                return {
                    id: key,
                    ...items[key]
                }
            })
            dispatch({type:C.GET_RECIPES, list: recipes})
        })
        .catch(e=>dispatch(reqResults(e.message, 'error')))
    }
}

export function get_recipe(id){
    return (dispatch, getState) => {
        const recipe = getState().recipes.recipesList.filter((r)=>r.id===id)
        if(recipe.length!==0){
            dispatch({type:C.GET_RECIPE, recipe: recipe[0]})
        }else{
            dispatch(showLoader())
            fetch(`${url}/recipes/${id}.json`)
            .then(res=> {
                if(!res.ok) throw Error(res.statusText)
                return res.json()
            })
            .then(item=>{
                if(item){
                    const recipe = {...item, key: id}
                    dispatch({type:C.GET_RECIPE, recipe})
                }else{
                    dispatch(clearRecipeState())
                }
            })
            .catch(e=>dispatch(reqResults(e.message, 'error')))
        }
    }
}

export function changeRecipe(recipe, message='Изменено.', type = null, currentPageReset=false){
    return{
        type: C.CHANGE_RECIPE,
        recipe,
        alert: {message, type},
        currentPageReset
    }
}

export function clearRecipeState(){
    return {
        type: C.CLEAR_RICIPE_STATE,
    }
}

export function showLoader(){
    return{type: C.SHOW_LOADER}
}

export function showAlert(message='\u00A0', type=null){
    return{
        type: C.SHOW_ALERT,
        alert: {message, type}
    }
}

export function hideAlert(){
    return{type: C.HIDE_ALERT}
}

export function reqResults(message='\u00A0', type=null){
    return{
        type: C.REQUEST_RESULTS,
        alert: {message, type}
    }
}