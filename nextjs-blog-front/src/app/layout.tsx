'use client';

import { Inter } from 'next/font/google';
import 'normalize.css';
import './globals.scss';
import Link from 'next/link';
import { ConfigProvider, Layout, Menu, Typography } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { HomeOutlined, ReadOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.variable}>
        <ConfigProvider
          locale={zhCN}
          theme={{
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 4,
            },
          }}
        >
          <Layout>
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
            <Content>
              <main>
                {children}
              </main>
            </Content>
            <Footer style={{ 
              textAlign: 'center',
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              padding: '1rem 0'
            }}>
              <Text style={{ color: '#e5e7eb' }}>
                © {new Date().getFullYear()} 我的个人博客 - 保留所有权利
              </Text>
            </Footer>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
