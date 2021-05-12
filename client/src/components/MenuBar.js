import React, { useState } from 'react'
import {  Menu } from 'semantic-ui-react'
import  { Link } from 'react-router-dom'
import'./MenuBar.css'
function MenuBar() {
  
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home':pathname.substr(1)
  const [activeItem,setActiveItem] = useState(path)
  const handleItemClick = (e,{ name }) => setActiveItem(name)

    return (
      <Menu className="menu" pointing secondary size="large" color="teal">
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to='/'
        />
        <Menu.Item
          name='Posts'
          active={activeItem === 'Posts'}
          onClick={handleItemClick}
          as={Link}
          to='/posts'
        />
        <Menu.Item
          name='Rooms'
          active={activeItem === 'Rooms'}
          onClick={handleItemClick}
          as={Link}
          to='/Rooms'
        />
        <Menu.Menu position='right'>
          <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
         <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to='/register'
          />
        </Menu.Menu>
      </Menu>
    )
    }
export default MenuBar