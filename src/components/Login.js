import React from 'react'
import './Login.css'
import { auth, provider } from '../firebase'
import { actionTypes } from '../Reducer'
import { useStateValue } from '../StateProvider'

function Login() {
  const [{}, dispatch] = useStateValue()

  const singIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log(result)
        dispatch({ type: actionTypes.SET_USER, payload: result.user })
        return null
      })
      .catch((e) => {
        console.error(e)
        // eslint-disable-next-line no-alert
        alert(e)
      })
  }

  return (
    <div className="login grid">
      <div className="login__container">
        <img
          src="https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png"
          alt="img"
        />
        <div className="login__text">
          <h1>Sign into WhatsApp</h1>
        </div>
        <button onClick={singIn}>Sign in with Google</button>
      </div>
    </div>
  )
}

export default Login
