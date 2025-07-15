'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, message, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './login.module.scss';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { addUser } from '@/api';

const { Title, Text } = Typography;
const { Content } = Layout;

// 登录方法，邮箱 + 第三方登录（github）
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  // 初始化时检查用户状态
  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((eve, session) => {
  //     console.log(session)
  //   })
  // }, [])

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      })
      if (error) throw error
      await addUser({
        email: data.user.email,
        user_id: data.user.id
      })
      message.success('登录成功');
      router.push('/blog');
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
              name="email"
              rules={[{ required: true, message: '请输入邮箱' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="邮箱" />
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