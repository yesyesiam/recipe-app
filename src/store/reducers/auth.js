import C from "../actionsTypes"

const initialState = {
    token: null
}

export default function authReducer(state = initialState, action){
    switch(action.type){
        case C.AUTH_SUCCESS:
            return{
                token: action.token
            }
        case C.LOGOUT:
            return{
                token: null
            }
        default:
            return state
    }
}