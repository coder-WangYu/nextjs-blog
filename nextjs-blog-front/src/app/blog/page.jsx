'use client';

import Link from 'next/link';
import { Typography, Card, Row, Col, Tag, Space, Pagination, Radio } from 'antd';
import { CalendarOutlined, FolderOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import { fetchArticles, fetchArticleByCategory, fetchArticlesByPage, fetchArticleByCategoryByPage } from '@/api';

const { Title, Paragraph, Text } = Typography;

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [curCate, setCurCate] = useState("全部");
  const [curPage, setCurPage] = useState(1);
  const range = [0, 5]
  const pageSize = 6;

  useEffect(() => {
    fetchArticles().then(data => {
      setTotal(data.length);
    });
    fetchArticlesByPage(range).then(data => {
      setBlogPosts(data)
    })
  }, []);

  const categories = ['全部', '技术', '旅行', '随笔', '摄影', '阅读', '音乐'];

  function setCategory(value) {
    setCurPage(1)
    setCurCate(value)

    if (value === '全部') {
      fetchArticles().then(data => {
        setTotal(data.length);
      })
      fetchArticlesByPage(range).then(data => {
        setBlogPosts(data)
      })
    } else {
      fetchArticleByCategory(value).then(data => {
        setTotal(data.length)
      })
      fetchArticleByCategoryByPage(value, range).then(data => {
        setBlogPosts(data)
      })
    }
  }

  async function onPageChange(page, size) {
    setCurPage(page)
    const range = [page * size - size, page * size - 1]
    
    if (curCate === '全部') {
      await fetchArticlesByPage(range).then(data => {
        setBlogPosts(data)
      })
    } else {
      await fetchArticleByCategory(curCate).then(data => {
        setTotal(data.length)
      })
      await fetchArticleByCategoryByPage(curCate, range).then(data => {
        setBlogPosts(data)
      })
    }
  }

  return (
    <section className="section blog-page">
      <div className="container">
        <div className="section-title">
          <Title level={1}>博客文章</Title>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Radio.Group defaultValue="全部" buttonStyle="solid">
            {categories.map(category => (
              <Radio.Button key={category} value={category} onClick={() => setCategory(category)}>
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
                      backgroundImage: `url(${post.coverImage}.jpg)`,
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
        
        {/* TODO: 分页功能完善 */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Pagination
            current={curPage}
            pageSize={pageSize}
            defaultCurrent={1} 
            total={total}
            onChange={(page, size) => onPageChange(page, size)} 
          />
        </div>
      </div>
    </section>
  );
} 