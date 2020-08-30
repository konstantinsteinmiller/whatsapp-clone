import React, { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Chat from './components/Chat'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useStateValue } from './StateProvider'

function App() {
  const [{ user }, setUser] = useStateValue(null)

  return (
    <div className="app">
      <div className="app__body flex">
        {!user ? (
          <Login />
        ) : (
          <Router>
            <Sidebar className="" />

            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">{/* Chat*/}</Route>
            </Switch>
          </Router>
        )}
      </div>
    </div>
  )
}

export default App
