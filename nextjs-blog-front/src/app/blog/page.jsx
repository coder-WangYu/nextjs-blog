'use client';

import Link from 'next/link';
import { Typography, Card, Row, Col, Tag, Space, Pagination, Radio } from 'antd';
import { CalendarOutlined, FolderOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function Blog() {
  // TODO: 从数据库中获取博客文章 
  const blogPosts = [
    {
      id: 1,
      title: '探索未知的旅程',
      excerpt: '关于我最近的一次旅行经历和感悟，分享那些美丽的风景和难忘的时刻。',
      coverImage: '/post-1.jpg',
      date: '2023-12-15',
      category: '旅行'
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