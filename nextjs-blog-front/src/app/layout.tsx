'use client';

import { Inter } from 'next/font/google';
import 'normalize.css';
import './globals.scss';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/locale/zh_CN';
// import HeaderLayout from 'components/HeaderLayout/page';
import { useEffect } from 'react';

const { Content } = Layout;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
            {/* <HeaderLayout /> */}
            <Content>
              <main>
                {children}
              </main>
            </Content>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
