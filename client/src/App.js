import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/MyNavbar';
import Home from './components/pages/Home'
import AuthState from './context/auth/AuthState';
import ExerciseState from './context/exercise/ExerciseState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import AddExercise from './components/exercises/AddExercise';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {

  const loaderContainer = document.querySelector('.loader-container')

  useEffect(() => {
    if (loaderContainer){
      loaderContainer.classList.add('finish')
    }
  },[loaderContainer])

  return (
    <AuthState>
      <ExerciseState >
        <Router>
          <>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/addexercise' component={AddExercise}/>
              </Switch>
            </div>
          </>
        </Router>
      </ExerciseState>
    </AuthState>
  );
}

export default App;