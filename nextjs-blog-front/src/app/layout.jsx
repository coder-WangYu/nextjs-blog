'use client';

import { Inter } from 'next/font/google';
import 'normalize.css';
import './globals.scss';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import HeaderLayout from "../../components/HeaderLayout/page";
import FooterLayout from "../../components/FooterLayout/page";

const { Content } = Layout;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}) {
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
            <HeaderLayout />
            <Content>
              <main>
                {children}
              </main>
            </Content>
            <FooterLayout />
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
} 