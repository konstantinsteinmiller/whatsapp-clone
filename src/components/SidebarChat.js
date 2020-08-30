import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db from '../firebase'
import { Link } from 'react-router-dom'

function SidebarChat({ addNewChat, name, id }) {
  const [seed, setSeed] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessage(snapshot.docs.map((doc) => doc.data()))
        )
    }
  }, [id])

  const createChat = () => {
    // eslint-disable-next-line no-alert
    const rootName = prompt('Please enter name for chat')

    if (rootName) {
      db.collection('rooms').add({
        name: rootName,
      })
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div
        className="sidebar-chat flex p-5 cursor-pointer border
                 border-solid border-gray-100 hover:bg-gray-200"
      >
        <Avatar
          className="mr-3"
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        />
        <div>
          <h2 className="text-lg mb-1">{name}</h2>
          <p>{message[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="ml-3 p-3">
      <h2>add new chat</h2>
    </div>
  )
}

export default SidebarChat
