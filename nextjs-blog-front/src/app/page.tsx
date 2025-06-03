'use client';

import Link from 'next/link';
import { Button, Card, Typography, Row, Col, Divider } from 'antd';
import { ReadOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const recentPosts = [
    {
      id: 1,
      title: '探索未知的旅程',
      excerpt: '关于我最近的一次旅行经历和感悟，分享那些美丽的风景和难忘的时刻。',
      coverImage: '/post-1.jpg',
      date: '2023-12-15'
    },
    {
      id: 2,
      title: '编程的艺术',
      excerpt: '探讨编程不仅是一门技术，更是一门需要创造力和美学的艺术。',
      coverImage: '/post-2.jpg',
      date: '2023-11-28'
    },
    {
      id: 3,
      title: '生活的思考',
      excerpt: '关于现代生活方式的一些思考和感悟，寻找平衡与和谐。',
      coverImage: '/post-3.jpg',
      date: '2023-11-10'
    }
  ];

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <Title level={1} style={{ color: 'white', marginBottom: '1rem' }}>探索、创造、分享</Title>
            <Paragraph style={{ fontSize: '1.25rem', color: 'white', opacity: 0.9, marginBottom: '2rem' }}>
              欢迎来到我的个人空间，这里记录着我的思考、创作和生活点滴。
            </Paragraph>
            <Button type="primary" size="large" href="/blog">
              进入博客 <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <Title level={2}>最新文章</Title>
            <Paragraph type="secondary">分享我最近的思考和创作</Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            {recentPosts.map(post => (
              <Col xs={24} sm={24} md={8} key={post.id}>
                <Card
                  hoverable
                  cover={<div style={{ 
                    height: 200, 
                    backgroundImage: `url(${post.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />}
                  actions={[
                    <Link key="read-more" href={`/blog/${post.id}`}>
                      <Button type="link">
                        阅读更多 <ArrowRightOutlined />
                      </Button>
                    </Link>
                  ]}
                >
                  <Card.Meta 
                    title={post.title} 
                    description={
                      <>
                        <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>{post.date}</Text>
                        <Paragraph ellipsis={{ rows: 3 }}>{post.excerpt}</Paragraph>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="section about-section" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="container">
          <div className="section-title">
            <Title level={2}>关于我</Title>
            <Paragraph type="secondary">了解更多关于我的故事</Paragraph>
          </div>
          
          <Row justify="center">
            <Col xs={24} sm={24} md={16}>
              <Card variant="borderless">
                <Paragraph style={{ fontSize: '16px' }}>
                  我是一名热爱生活、热爱创造的博主。通过这个博客，我希望能够分享我的经历、想法和创作，与志同道合的朋友们一起成长。
                </Paragraph>
                <Paragraph style={{ fontSize: '16px' }}>
                  无论是技术探索、旅行见闻还是生活感悟，我都希望通过文字的力量，传递价值，启发思考。
                </Paragraph>
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <Button type="primary" size="large" href="/about">
                    了解更多 <ReadOutlined />
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
}
