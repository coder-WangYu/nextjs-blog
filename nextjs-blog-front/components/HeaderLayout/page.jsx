import React, { useEffect, useRef } from 'react'
import { HomeOutlined, ReadOutlined, FormOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import {Layout, Menu, Button, Upload} from 'antd';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';
import { Avatar, Modal, Form, Input } from 'antd/lib';
import { getUserInfoById, updateUser } from '@/api';

const {Header} = Layout;

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
  // TODO：未登录时，点击后跳转到登录页面，登录后跳转到写博客页面
  {
    key: 'write',
    icon: <FormOutlined />,
    label: <Link href="/write">写博客</Link>,
  }
];

export default function HeaderLayout() {
  const [user, setUser] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const inputRef = useRef()

  useEffect(() => {
    supabase.auth.onAuthStateChange((info, userInfo) => {
      getUserInfoById(userInfo.user.id).then(user => {
        setUser(user)
      })
    })
  }, [])

  async function handleOk() {
    const username = inputRef.current.input.value

    await updateUser(username, user.user_id).then(res => {
      setUser(res[0])
    })
    
    setIsModalOpen(false);
  };

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
      
      {
        user 
          ? <Avatar style={{cursor: 'pointer'}} size={40} onClick={() => setIsModalOpen(true)}>
              {user.username ? user.username : 'USER'}
            </Avatar>
          : <Button style={{marginLeft: '10px'}} type='primary' href="/login">登录/注册</Button>
      }

      <Modal
        title="修改个人信息"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        cancelText="取消"
        okText="提交"
      >
        昵称：<Input ref={inputRef} style={{width: '300px'}} defaultValue={user.username} />
      </Modal>
    </Header>
  )
} 