'use client';

import { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, message, Layout } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './register.module.scss';

const { Title, Text } = Typography;
const { Content } = Layout;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: { username: string; email: string; password: string; confirm: string }) => {
    setLoading(true);
    try {
      // 这里是模拟注册，实际项目中应该调用API
      console.log('注册信息:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('注册成功');
      // 实际项目中这里应该进行页面跳转
    } catch (error) {
      message.error('注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className={styles.fullPageLayout}>
      <Content className={styles.registerContainer}>
        <Card className={styles.registerCard}>
          <Title level={2} className={styles.registerTitle}>用户注册</Title>
          <Divider />
          
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            scrollToFirstError
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="邮箱" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码长度不能少于6个字符' }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="密码" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              rules={[
                { required: true, message: '请确认密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                注册
              </Button>
            </Form.Item>

            <div className={styles.loginNow}>
              <Text>已有账号? <a href="/login">立即登录</a></Text>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
} 