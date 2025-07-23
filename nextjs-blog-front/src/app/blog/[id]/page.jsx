'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Typography, Card, Divider, Tag, Space, Image, Skeleton, Button } from 'antd';
import { CalendarOutlined, FolderOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './blog-detail.module.scss';
import { fetchArticleById } from '@/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import 'highlight.js/styles/atom-one-dark.css';

const { Title, Paragraph, Text } = Typography;

export default function BlogDetail() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticleById(params.id).then(data => {
      setPost(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Skeleton active avatar paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.container} style={{ textAlign: 'center' }}>
        <Title level={2}>文章未找到</Title>
        <Paragraph>
          抱歉，您请求的文章不存在或已被删除。
        </Paragraph>
        <Link href="/blog">
          <Button type="primary">
            <ArrowLeftOutlined /> 返回博客列表
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.blogDetailPage}>
      <div className={styles.container}>
        <Card bordered={false}>
          <Link href="/blog" className={styles.backLink}>
            <Space>
              <ArrowLeftOutlined /> 返回博客列表
            </Space>
          </Link>
          
          <div className={styles.metaInfo}>
            <Title level={1}>{post.title}</Title>
            
            <Space split={<Divider type="vertical" />} style={{ marginBottom: '1rem' }}>
              <Text type="secondary">
                <CalendarOutlined style={{ marginRight: '5px' }} />
                {post.date}
              </Text>
              <Tag color="blue">
                <FolderOutlined style={{ marginRight: '5px' }} />
                {post.category}
              </Tag>
            </Space>
          </div>
          
          <div 
            className={styles.coverImage} 
            style={{ backgroundImage: `url(../${post.coverImage}.jpg)` }}
          />
          
          <div 
            className={styles.blogContent}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeRaw,
                [rehypeHighlight, { ignoreMissing: true, subset: false }],
                rehypeSanitize
              ]}
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  return !inline ? (
                    <div className={styles.codeBlockWrapper}>
                      {language && (
                        <div className={styles.codeLanguage}>
                          {language.toUpperCase()}
                        </div>
                      )}
                      <pre className={styles.codeBlock}>
                        <code
                          className={language ? `language-${language}` : ''}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </code>
                      </pre>
                    </div>
                  ) : (
                    <code className={styles.inlineCode} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </Card>
      </div>
    </div>
  );
} 