import React from 'react'
import { HomeOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Menu, Header } from 'antd';

const menuItems = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: <Link href="/">首页</Link>,
  },
  {
    key: 'blog',
    icon: <ReadOutlined />,
    label: <Link href="/blog">文章</Link>,
  },
  {
    key: 'about',
    icon: <UserOutlined />,
    label: <Link href="/about">关于</Link>,
  }
];

export default function HeaderLayout() {
  return (
    <Header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      width: '100%',
      padding: '0 24px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(5px)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Menu 
        mode="horizontal" 
        items={menuItems} 
        style={{ 
          flex: 1, 
          justifyContent: 'flex-end',
          backgroundColor: 'transparent',
          border: 'none'
        }} 
      />
    </Header>
  )
}