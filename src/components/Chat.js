import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import db from '../firebase'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../StateProvider'

function Chat() {
  const [seed, setSeed] = useState('')
  const [input, setInput] = useState('')
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('')
  const [messagesList, setMessagesList] = useState([])
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    console.log('roomId: ', roomId)
    if (roomId) {
      setSeed(Math.floor(Math.random() * 5000))
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name))

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessagesList(snapshot.docs.map((doc) => doc.data()))
        )
    }
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault()

    db.collection('rooms').doc(roomId).collection('messages').add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('')
  }

  return (
    <div className="chat flex flex-col flex-grow-1 ">
      <div className="chat__header p-5 flex items-center border-b border-solid border-gray-400">
        <Avatar
          className="mr-3"
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        />

        <div className="chat__header-info flex-grow">
          <h2 className="text-lg font-bold">{roomName}</h2>
          <p>
            last seen{' '}
            {new Date(
              messagesList[messagesList.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat__header-right flex justify-between items-center min-w-24">
          {/* <IconButton>*/}
          <SearchOutlined className="mr-2" />
          {/* </IconButton>*/}
          {/* <IconButton>*/}
          <AttachFileIcon className="mr-2" />
          {/* </IconButton>*/}
          {/* <IconButton>*/}
          <MoreVertIcon className="mr-2" />
          {/* </IconButton>*/}
        </div>
      </div>

      <div className="chat__body flex-grow-1">
        {messagesList.map((message) => (
          <p
            key={message.message}
            className={`chat__message relative text-lg p-2 mb-4 rounded-lg bg-white ${
              message.name === user.displayName && 'ml-auto bg-green-200'
            }`}
          >
            {message.message}
            <span className="chat__name absolute top-0 left-0 ml-2 -mt-5 font-bold text-sm">
              {message.name}
            </span>
            <span className="chat__timestamp ml-3 text-sm">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div
        className="chat__footer flex justify-between items-center h-16
                   border-t border-solid border-gray-300"
      >
        <InsertEmoticonIcon className="m-2 mr-4" />
        <form className="flex flex-grow mr-3 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow border-none p-2 rounded-lg h-8"
            type="text"
            placeholder="new message"
          />
          <button className="p-4 hidden" onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <MicIcon className="m-2 mr-4" />
      </div>
    </div>
  )
}

export default Chat
