import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'

import icon from '../images/cryptocurrency.png'
import { Link } from 'react-router-dom'
import { BulbOutlined, FundOutlined, HomeOutlined, MoneyCollectOutlined, MenuOutlined } from '@ant-design/icons/lib/icons'
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {
    if (screenSize <= 768) setActiveMenu(false)
    else setActiveMenu(true)
  }, [screenSize])
  return (
    <div className='nav-container'>
      <div className="logo-container">
        <Avatar src={icon} size='large' />
        <Typography.Title level={4} className='logo'>
          <Link to='/'>Alisher company</Link>
        </Typography.Title>
        <Button className='menu-control-container'  onClick={()=> setActiveMenu(!activeMenu )}>
          <MenuOutlined />
          </Button>
      </div>
      {activeMenu && (
        <Menu theme='dark'>
          <Menu.Item key={1} icon={<HomeOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key={2} icon={<FundOutlined />}>
            <Link to='/Cryptocurrencies'>Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item key={3} icon={<MoneyCollectOutlined />}>
            <Link to='/Exchanges'>Exchanges</Link>
          </Menu.Item>
          <Menu.Item key={4} icon={<BulbOutlined />}>
            <Link to='/News'>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}

export default Navbar
