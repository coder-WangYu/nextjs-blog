'use client';

import { Typography, Form, Input, Button, Card, Row, Col, List, Space } from 'antd';
import { MailOutlined, WechatOutlined, GithubOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function Contact() {
  const contactInfo = [
    {
      icon: <MailOutlined style={{ fontSize: '24px' }} />,
      title: '邮箱',
      content: <a>coder_wangyu@163.com</a>
    },
    {
      icon: <WechatOutlined style={{ fontSize: '24px' }} />,
      title: '微信',
      content: <a>Lrwy999999</a>
    },
    {
      icon: <GithubOutlined style={{ fontSize: '24px' }} />,
      title: 'GitHub',
      content: <a href="https://github.com/coder-WangYu" target="_blank" rel="noopener noreferrer">github.com/coder-WangYu</a>
    }
  ];

  return (
    <section className="section contact-page">
      <div className="container">
        <div className="section-title">
          <Title level={1}>联系我</Title>
          <Paragraph type="secondary">有任何问题或合作意向，欢迎联系</Paragraph>
        </div>
        
        <Row gutter={[48, 24]} style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Col xs={24} md={8}>
            <Card title="联系方式" bordered={false}>
              <List
                itemLayout="vertical"
                dataSource={contactInfo}
                renderItem={(item) => (
                  <List.Item>
                    <Space direction="vertical" size="small" style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ textAlign: 'center', marginBottom: 8 }}>
                        {item.icon}
                      </div>
                      <Text strong style={{ display: 'block', textAlign: 'center' }}>
                        {item.title}
                      </Text>
                      <div style={{ textAlign: 'center' }}>
                        {item.content}
                      </div>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          
          <Col xs={24} md={16}>
            <Card title="发送消息" bordered={false}>
              <Form layout="vertical">
                <Form.Item 
                  label="姓名" 
                  name="name"
                  rules={[{ required: true, message: '请输入您的姓名' }]}
                >
                  <Input placeholder="请输入您的姓名" />
                </Form.Item>
                
                <Form.Item 
                  label="邮箱" 
                  name="email"
                  rules={[
                    { required: true, message: '请输入您的邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' }
                  ]}
                >
                  <Input placeholder="请输入您的邮箱" />
                </Form.Item>
                
                <Form.Item 
                  label="主题" 
                  name="subject"
                  rules={[{ required: true, message: '请输入主题' }]}
                >
                  <Input placeholder="请输入主题" />
                </Form.Item>
                
                <Form.Item 
                  label="消息" 
                  name="message"
                  rules={[{ required: true, message: '请输入消息内容' }]}
                >
                  <TextArea rows={6} placeholder="请输入消息内容" />
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" icon={<SendOutlined />} size="large" style={{ float: 'right' }}>
                    发送消息
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
} 