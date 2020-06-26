import React, {useEffect} from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {auth, logout} from './store/actions/auth'
import Navbar from './components/Navbar';
import Main from './pages/Main';
import Details from './pages/Details';
import Auth from './pages/Auth';
import Add from './pages/Add';

import firebase from 'firebase/app';
import 'firebase/auth';
import Alert from './components/Alert';

firebase.initializeApp({
    apiKey: "AIzaSyCCM8Jtg2Ke8P8xfG036aldYqo-xLMzAaM",
    authDomain: "cookingrecipes-b26f5.firebaseapp.com"
  })

function App() {
    const isLogin = useSelector(state => !!state.auth.token)
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        firebase.auth().signOut()
        dispatch(logout())
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user => {
            if(!!user){
                dispatch(auth(user.toJSON(), logoutHandler))
            }
          })
          // eslint-disable-next-line
    },[])

    return (
        <BrowserRouter>
            <div className="container">
                <Navbar isLogin={isLogin}/>
                <Alert />
                <Switch>
                    <Route path='/' exact component={Main} />
                    <Route path="/details/:id" component={Details}/>
                    <Route path="/auth" render={()=><Auth firebase={firebase}/>}/>
                    {
                        isLogin&&<Route path='/add' component={Add} />
                    }
                    <Redirect to='/' />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;