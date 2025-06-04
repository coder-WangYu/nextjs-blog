'use client';

import { Typography, Card, List, Divider, Avatar, Space } from 'antd';
import { MailOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function About() {
  const interests = [
    '编程与技术',
    '摄影与视觉艺术',
    '旅行探索',
    '阅读与写作',
    '音乐欣赏'
  ];

  const contactInfo = [
    {
      icon: <MailOutlined style={{ fontSize: '24px' }} />,
      title: '邮箱',
      content: 'coder_wangyu@163.com'
    },
    {
      icon: <WechatOutlined style={{ fontSize: '24px' }} />,
      title: '微信',
      content: 'Lrwy999999'
    },
    {
      icon: <GithubOutlined style={{ fontSize: '24px' }} />,
      title: 'GitHub',
      content: <a href="https://github.com/coder-WangYu" target="_blank" rel="noopener noreferrer">github.com/coder-WangYu</a>
    }
  ];

  return (
    <section className="section about-page">
      <div className="container">
        <div className="section-title">
          <Title level={1}>关于我</Title>
          <Paragraph type="secondary">了解我的故事和经历</Paragraph>
        </div>
        
        <Card bordered={false} style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Avatar 
              size={120} 
              src="/avator.png"
              alt="个人头像"
            />
          </div>
          
          <Title level={2}>我是谁</Title>
          <Paragraph style={{ fontSize: '16px' }}>
            大家好，我是一名热爱生活、热爱创造的博主。通过这个博客，我希望能够分享我的经历、想法和创作，与志同道合的朋友们一起成长。
          </Paragraph>
          
          <Divider />
          
          <Title level={2}>我的故事</Title>
          <Paragraph style={{ fontSize: '16px' }}>
            我从小就对世界充满好奇，喜欢探索各种新鲜事物。大学期间，我开始接触编程，并逐渐爱上了这门既需要逻辑思维又需要创造力的学科。
          </Paragraph>
          <Paragraph style={{ fontSize: '16px' }}>
            毕业后，我在科技行业工作，同时保持着对写作和摄影的热爱。这个博客就是我记录生活、分享知识的地方。
          </Paragraph>
          
          <Divider />
          
          <Title level={2}>我的兴趣</Title>
          <List
            bordered
            dataSource={interests}
            renderItem={(item) => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
          
          <Divider />
          
          <Title level={2}>联系我</Title>
          <Paragraph style={{ fontSize: '16px', marginBottom: '20px' }}>
            如果你有任何问题，或者想要交流，欢迎通过以下方式联系我：
          </Paragraph>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {contactInfo.map((item, index) => (
              <div key={index} style={{ textAlign: 'center', margin: '0 10px 20px' }}>
                <Space direction="vertical" size="small" style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginBottom: 8 }}>
                    {item.icon}
                  </div>
                  <Text strong style={{ display: 'block' }}>
                    {item.title}
                  </Text>
                  <div>
                    {item.content}
                  </div>
                </Space>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
} 