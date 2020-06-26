import C from "../actionsTypes"

const initialState = {
    keys: [],
    currentPage: null,
    cached: false,
    recipesList: [],
    recipe: null,
    loading: false,
    alert: {
        visible: false,
    }
}

export default function recipesReducer(state = initialState, action){
    switch(action.type){
        case C.SHOW_ALERT:
            return{
                ...state, alert: {...action.alert, visible: true}
            }
        case C.HIDE_ALERT:
            return{
                ...state, alert: {visible: false}
            }
        case C.REQUEST_RESULTS:
            return{
                ...state, loading: false, alert: {...action.alert, visible: true}
            }
        case C.SHOW_LOADER:
            return{
                ...state, loading: true
            }
        case C.GET_RECIPES:
            return{
                ...state, loading: false, recipesList: action.list
            } 
        case C.GET_RECIPE:
            return{
                ...state, recipe: action.recipe, loading: false
            }
        case C.CHANGE_RECIPE:
            return{
                ...state, 
                loading: false, 
                alert: {...action.alert, visible: true}, 
                recipe: action.recipe,
                cached: false, 
                keys: [],
                currentPage: action.currentPageReset?null:state.currentPage, 
                recipesList: []
            }
        case C.CLEAR_RICIPE_STATE:
            return{
                ...state, recipe: null
            }
        case C.GET_KEYS:
            return{
                ...state, keys: action.keys, cached: true
            }
        case C.CHANGE_PAGE:
            return{
                ...state, currentPage: action.index
            }
        default:
            return state
    }
}