'use client';

import Link from 'next/link';
import { Button, Card, Typography, Row, Col, Divider } from 'antd';
import { ReadOutlined, ArrowRightOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchArticlesForHome } from '../api';

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  // {
  //   id: 1,
  //   title: '探索未知的旅程',
  //   excerpt: '关于我最近的一次旅行经历和感悟，分享那些美丽的风景和难忘的时刻。',
  //   coverImage: '/post-1.jpg',
  //   date: '2023-12-15'
  // },
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetchArticlesForHome().then(data => {
      setRecentPosts(data);
    });
  }, []);

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
          </div>
          
          <Row gutter={[24, 24]}>
            {recentPosts.map(post => (
              <Col xs={24} sm={24} md={8} key={post.id}>
                <Card
                  hoverable
                  cover={<div style={{ 
                    height: 200, 
                    backgroundImage: `url(${post.coverImage}.jpg)`,
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
    </>
  );
} 