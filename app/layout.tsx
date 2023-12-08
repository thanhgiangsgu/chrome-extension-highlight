"use client"
import React, { useState } from 'react';
import './globals.css'
import { Layout } from 'antd';
import LoginButton from "@/app/components/loginButton";
import Navigation from './components/menu';

const { Sider } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <html lang="en">
      <body>
        <Layout style={{ maxHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <LoginButton />
            <Navigation />
          </Sider>
          <Layout>
            {children}
          </Layout>
        </Layout>
      </body>
    </html>
  )
}
