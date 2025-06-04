'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, message, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './login.module.scss';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;
const { Content } = Layout;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 这里是模拟登录，实际项目中应该调用API
      console.log('登录信息:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('登录成功');
      router.push('/blog');
      // 实际项目中这里应该进行页面跳转或状态更新
    } catch (error) {
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className={styles.fullPageLayout}>
      <Content className={styles.loginContainer}>
        <Card className={styles.loginCard}>
          <Title level={2} className={styles.loginTitle}>用户登录</Title>
          <Divider />
          
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="密码" />
            </Form.Item>

            <Form.Item>
              <div className={styles.forgotPassword}>
                <a href="#">忘记密码?</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                登录
              </Button>
            </Form.Item>

            <div className={styles.registerNow}>
              <Text>还没有账号? <a href="/register">立即注册</a></Text>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
} 