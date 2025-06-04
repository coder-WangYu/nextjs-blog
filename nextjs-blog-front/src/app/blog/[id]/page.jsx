'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Typography, Card, Divider, Tag, Space, Image, Skeleton, Button } from 'antd';
import { CalendarOutlined, FolderOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './blog-detail.module.scss';

const { Title, Paragraph, Text } = Typography;

// 模拟博客文章数据，实际项目中应该从API获取
const blogPosts = [
  {
    id: 1,
    title: '探索未知的旅程',
    content: `
      <p>旅行是一种奇妙的体验，它能让我们暂时脱离日常生活的束缚，去探索这个世界的美丽与神奇。在我最近的一次旅行中，我深刻体会到了这一点。</p>
      
      <p>清晨，当第一缕阳光穿透云层，洒在山间的小路上，我开始了一天的徒步旅程。空气中弥漫着泥土和植物的清香，远处传来鸟儿的鸣叫，一切都显得那么宁静而美好。</p>
      
      <p>途中，我遇到了来自不同国家的旅行者，我们分享着各自的故事和经历。尽管语言和文化的差异，但对美景的欣赏和对探索的热情却是共通的。这种跨越国界的交流，让我对这个世界有了更深的理解。</p>
      
      <p>当我登上山顶，俯瞰脚下的壮丽景色时，所有的疲惫都烟消云散。那一刻，我感到自己是如此的渺小，而这个世界又是如此的广阔。这种对自然的敬畏之情，是任何语言都难以描述的。</p>
      
      <p>旅行不仅仅是去看风景，更是一次心灵的历程。它让我们跳出固有的思维框架，用新的视角去看待这个世界和自己。每一次旅行，都是一次成长的机会。</p>
    `,
    coverImage: '/post-1.jpg',
    date: '2023-12-15',
    category: '旅行',
    tags: ['旅行', '探索', '心灵成长']
  },
  {
    id: 2,
    title: '编程的艺术',
    content: `
      <p>编程不仅仅是一门技术，更是一门艺术。就像画家用画笔创造美丽的图画，程序员用代码构建精妙的系统。</p>
      
      <p>在我看来，一段优秀的代码应该具备清晰、简洁、高效的特点。它不仅能够完成功能需求，还应该易于理解和维护。这就像一首优美的诗歌，不仅表达了思想，还讲究结构和韵律。</p>
      
      <p>编程的过程充满了创造性和挑战性。当我们面对一个复杂的问题时，需要分析、思考、设计解决方案。这个过程中，我们需要不断尝试、失败、学习、改进，直到找到最佳方案。</p>
      
      <p>而当代码最终运行成功，看到自己的创造物发挥作用时，那种成就感是无与伦比的。这就是编程的魅力所在。</p>
      
      <p>随着人工智能、区块链等新技术的发展，编程的艺术也在不断演进。作为程序员，我们需要保持学习的热情，不断更新自己的知识库，才能在这个快速变化的领域中保持竞争力。</p>
      
      <p>总的来说，编程是技术与艺术的完美结合。它不仅需要逻辑思维，还需要创造力和审美能力。通过编程，我们可以将想法转化为现实，创造出改变世界的产品。</p>
    `,
    coverImage: '/post-2.jpg',
    date: '2023-11-28',
    category: '技术',
    tags: ['编程', '技术', '创造力']
  },
  {
    id: 3,
    title: '生活的思考',
    content: `
      <p>在这个快节奏的现代社会中，我们常常被各种事务和信息所淹没，很少有时间停下来思考生活的本质和意义。</p>
      
      <p>什么是真正重要的？是事业的成功、财富的积累，还是健康的身体、和谐的人际关系？这些问题值得我们深思。</p>
      
      <p>在追求物质满足的同时，我们是否忽略了精神层面的需求？在社交媒体上展示"完美"生活的同时，我们是否真的感到幸福？</p>
      
      <p>我认为，生活的平衡很重要。工作和休息、付出和收获、社交和独处，都需要适当的比例。过度倾向任何一方，都可能导致不健康的状态。</p>
      
      <p>同时，保持感恩的心态也很重要。感谢生活中的每一个小确幸，感谢身边支持和关爱我们的人，这样才能真正体会到生活的美好。</p>
      
      <p>最后，不要忘记活在当下。过去已经过去，未来尚未到来，真正属于我们的只有此刻。珍惜当下的每一刻，全心投入到正在做的事情中，这或许就是生活的真谛。</p>
    `,
    coverImage: '/post-3.jpg',
    date: '2023-11-10',
    category: '随笔',
    tags: ['生活', '思考', '平衡']
  }
];

export default function BlogDetail() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      const foundPost = blogPosts.find(p => p.id.toString() === params.id);
      setPost(foundPost || null);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
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
            
            <div className={styles.tags}>
              {post.tags.map(tag => (
                <Tag key={tag} style={{ marginRight: '8px' }}>{tag}</Tag>
              ))}
            </div>
          </div>
          
          <div 
            className={styles.coverImage} 
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />
          
          <div 
            className={styles.blogContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Card>
      </div>
    </div>
  );
} 