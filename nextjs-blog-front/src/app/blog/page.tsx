'use client';

import Link from 'next/link';
import { Typography, Card, Row, Col, Tag, Space, Pagination, Radio } from 'antd';
import { CalendarOutlined, FolderOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: '探索未知的旅程',
      excerpt: '关于我最近的一次旅行经历和感悟，分享那些美丽的风景和难忘的时刻。',
      coverImage: '/post-1.jpg',
      date: '2023-12-15',
      category: '旅行'
    },
    {
      id: 2,
      title: '编程的艺术',
      excerpt: '探讨编程不仅是一门技术，更是一门需要创造力和美学的艺术。',
      coverImage: '/post-2.jpg',
      date: '2023-11-28',
      category: '技术'
    },
    {
      id: 3,
      title: '生活的思考',
      excerpt: '关于现代生活方式的一些思考和感悟，寻找平衡与和谐。',
      coverImage: '/post-3.jpg',
      date: '2023-11-10',
      category: '随笔'
    },
    {
      id: 4,
      title: '摄影技巧分享',
      excerpt: '分享一些我在摄影过程中学到的技巧和心得，帮助你拍出更好的照片。',
      coverImage: '/post-1.jpg',
      date: '2023-10-25',
      category: '摄影'
    },
    {
      id: 5,
      title: '阅读与成长',
      excerpt: '读书不仅是获取知识的方式，更是一种精神成长的过程。分享我最近读过的几本好书。',
      coverImage: '/post-2.jpg',
      date: '2023-10-12',
      category: '阅读'
    },
    {
      id: 6,
      title: '音乐的力量',
      excerpt: '音乐如何影响我们的情绪和生活，以及我最喜欢的几张专辑推荐。',
      coverImage: '/post-3.jpg',
      date: '2023-09-30',
      category: '音乐'
    }
  ];

  const categories = ['全部', '技术', '旅行', '随笔', '摄影', '阅读', '音乐'];

  return (
    <section className="section blog-page">
      <div className="container">
        <div className="section-title">
          <Title level={1}>博客文章</Title>
          <Paragraph type="secondary">分享我的思考和创作</Paragraph>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Radio.Group defaultValue="全部" buttonStyle="solid">
            {categories.map(category => (
              <Radio.Button key={category} value={category}>
                {category}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        
        <Row gutter={[24, 24]}>
          {blogPosts.map(post => (
            <Col xs={24} sm={12} lg={8} key={post.id}>
              <Card
                hoverable
                cover={
                  <div 
                    style={{ 
                      height: 220, 
                      backgroundImage: `url(${post.coverImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                }
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div>
                    <Space split={<span style={{ margin: '0 8px' }}>•</span>}>
                      <Text type="secondary">
                        <CalendarOutlined /> {post.date}
                      </Text>
                      <Tag color="blue">
                        <FolderOutlined /> {post.category}
                      </Tag>
                    </Space>
                  </div>
                  
                  <Title level={4} style={{ margin: '8px 0' }}>{post.title}</Title>
                  
                  <Paragraph ellipsis={{ rows: 3 }} type="secondary">
                    {post.excerpt}
                  </Paragraph>
                  
                  <Link href={`/blog/${post.id}`}>
                    <Text strong style={{ display: 'flex', alignItems: 'center', color: '#1890ff' }}>
                      阅读全文 <ArrowRightOutlined style={{ marginLeft: 8 }} />
                    </Text>
                  </Link>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </section>
  );
} 