'use client';

import { Inter } from 'next/font/google';
import 'normalize.css';
import './globals.scss';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import HeaderLayout from "../../components/HeaderLayout/page";
import FooterLayout from "../../components/FooterLayout/page";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const { Content } = Layout;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({children}) {
  const [showLayout, setShowLayout] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // 根据路径判断是否显示布局
    if (pathname === '/login' || pathname === '/register') {
      setShowLayout(false);
    } else {
      setShowLayout(true);
    }
  }, [pathname]);

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
          {showLayout ? (
            <Layout>
              <HeaderLayout />
              <Content>
                <main>
                  {children}
                </main>
              </Content>
              <FooterLayout />
            </Layout>
          ) : (
            <main>{children}</main>
          )}
        </ConfigProvider>
      </body>
    </html>
  );
} 