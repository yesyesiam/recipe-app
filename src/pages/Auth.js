import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { logout } from '../store/actions/auth'
import { Link } from 'react-router-dom'


const Auth = ({firebase})=> {
    const isSignedIn = useSelector(state => !!state.auth.token)
    const dispatch = useDispatch()
    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
      }

    return(
        <div>
            {isSignedIn ? (
          <div className='center'>
            <h2>Привет, {firebase.auth().currentUser.displayName}.</h2>
            <p>
              Ты в системе!
              <br/>
              Теперь ты можешь
              <br/>
              добавлять и изменять рецепты.
            </p>
            <p><Link className='btn light-green darken-2' to='/'>На главную</Link></p>
            <button 
              className='btn blue-grey lighten-2' 
              onClick={() => {firebase.auth().signOut(); dispatch(logout())}}
            >
              Выйти
            </button>
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
        </div>
    )
}

export default Auth