import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { Avatar } from '@material-ui/core'
// import IconButton from '@material-ui/core/IconButton'
import SidebarChat from './SidebarChat'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import db from '../firebase'
import { useStateValue } from '../StateProvider'

function Sidebar() {
  const [roomsList, setRoomsList] = useState([])
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => {
      setRoomsList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="sidebar">
      <div
        className="sidebar__header flex justify-between p-5
                   border-r border-solid border-gray-300 opacity-100"
      >
        <div>
          <Avatar className="sidebar__avatar" src={user?.photoURL}>
            K
          </Avatar>
        </div>
        <div className="sidebar__header-right flex justify-between items-center">
          {/* <IconButton>*/}
          <DonutLargeIcon />
          {/* </IconButton>*/}
          {/* <IconButton>*/}
          <ChatIcon />
          {/* </IconButton>*/}
          {/* <IconButton>*/}
          <MoreVertIcon />
          {/* </IconButton>*/}
        </div>
      </div>

      <div className="sidebar__search bg-gray-100 p-2">
        <div className="sidebar__search-container p-2 flex items-center bg-white w-full h-9 rounded-lg">
          {/* <IconButton>*/}
          <SearchOutlined />
          {/* </IconButton>*/}
          <input
            className="border-none ml-3"
            placeholder="Search"
            type="text"
          />
        </div>
      </div>

      <div className="sidebar__chats overflow-auto flex flex-col flex-grow bg-white">
        <SidebarChat className="" addNewChat={true} name="roomChat" />
        {roomsList.map((room) => (
          <SidebarChat
            className=""
            onClick={() => {
              return room.id
            }}
            key={room.id}
            id={room.id}
            name={room.data.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
