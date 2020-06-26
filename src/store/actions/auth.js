import C from "../actionsTypes";

export function auth(user, c){
    return (dispatch, getState) => {
        dispatch({type: C.AUTH_SUCCESS, token: user.stsTokenManager.accessToken })
        const time = user.stsTokenManager.expirationTime - new Date().getTime()

        setTimeout(()=>{
            console.log("LOGOUT")
            c()
        },time)
    }
}

export function logout(){
    return {type: C.LOGOUT}
}