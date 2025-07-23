'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, message, Space, Card, Tag, Modal, Upload, Select, Tooltip, Drawer } from 'antd';
import { 
  SaveOutlined, 
  EyeOutlined, 
  UploadOutlined, 
  TagsOutlined,
  BoldOutlined,
  ItalicOutlined,
  LinkOutlined,
  PictureOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  CodeOutlined,
  TableOutlined,
  FileTextTwoTone
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import styles from './page.module.scss';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';
import { supabase } from '@/lib/supabaseClient';
import { createArticle } from '@/api'; 
import { useRouter } from 'next/navigation';

const selectOptions = [
  {
    label: '技术',
    value: '技术'
  },
  {
    label: '旅行',
    value: '旅行'
  },
  {
    label: '随笔',
    value: '随笔'
  },
  {
    label: '摄影',
    value: '摄影'
  },
  {
    label: '阅读',
    value: '阅读'
  },
  {
    label: '音乐',
    value: '音乐'
  }
];

const WritePage = () => {
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState('')
  const [isPreview, setIsPreview] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewMode, setPreviewMode] = useState<'side' | 'full'>('side');
  const router = useRouter()

  // 自动保存功能
  useEffect(() => {
    if (!autoSave || !content || !title) return;

    const saveTimer = setTimeout(async () => {
      try {
        // TODO: 实现自动保存逻辑
        setLastSaved(new Date());
      } catch (error) {
        console.error('自动保存失败:', error);
      }
    }, 30000); // 每30秒自动保存一次

    return () => clearTimeout(saveTimer);
  }, [content, title, autoSave]);

  // 获取用户信息
  useEffect(() => {
    supabase.auth.getUser().then(res => {
      setUser(res.data.user)
    })
  }, [])

  const handleSubmit = async () => {
    if (!title.trim()) {
      message.error('请输入文章标题');
      return;
    }
    if (!category.trim()) {
      message.error('请选择文章类型')
      return 
    }
    if (!content.trim()) {
      message.error('请输入文章内容');
      return;
    }

    const article = {
      title,
      category,
      content,
      author: user.email,
      excerpt: content.slice(0, 20),
      coverImage: 'test'
    }

    setLoading(true);
    try {
      const { data, error } = await createArticle(article)
      if (error) throw error
      message.success('文章发布成功！');
      router.push('/blog')
    } catch (error) {
      message.error('发布失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!title.trim() || !content.trim()) {
      message.error('标题和内容不能为空');
      return;
    }

    try {
      // TODO: 实现草稿保存逻辑
      message.success('草稿保存成功！');
      setLastSaved(new Date());
    } catch (error) {
      message.error('保存失败，请重试');
    }
  };

  const handleAddTag = (tag: string) => {
    if (tags.includes(tag)) {
      message.warning('标签已存在');
      return;
    }
    setTags([...tags, tag]);
  };

  function selectChange(value) {
    setCategory(value)
  }

  // 工具栏功能
  const insertText = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);
    
    setContent(newText);
    
    // 设置新的光标位置
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  const insertHeading = (level: number) => {
    const prefix = '#'.repeat(level) + ' ';
    insertText(prefix);
  };

  const insertLink = () => {
    Modal.confirm({
      title: '插入链接',
      content: (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input placeholder="链接文本" id="linkText" />
          <Input placeholder="链接地址" id="linkUrl" />
        </Space>
      ),
      onOk: () => {
        const text = (document.getElementById('linkText') as HTMLInputElement).value;
        const url = (document.getElementById('linkUrl') as HTMLInputElement).value;
        if (text && url) {
          insertText(`[${text}](${url})`);
        } else {
          message.warning('请输入链接文本和地址');
        }
      },
    });
  };

  const insertImage = () => {
    Modal.confirm({
      title: '插入图片',
      content: (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input placeholder="图片描述" id="imageAlt" />
          <Input placeholder="图片地址" id="imageUrl" />
        </Space>
      ),
      onOk: () => {
        const alt = (document.getElementById('imageAlt') as HTMLInputElement).value;
        const url = (document.getElementById('imageUrl') as HTMLInputElement).value;
        if (alt && url) {
          insertText(`![${alt}](${url})`);
        } else {
          message.warning('请输入图片描述和地址');
        }
      },
    });
  };

  const insertTable = () => {
    const tableTemplate = `| 标题1 | 标题2 | 标题3 |
                           |-------|-------|-------|
                           | 内容1 | 内容2 | 内容3 |
                           | 内容4 | 内容5 | 内容6 |`;
    insertText(tableTemplate);
  };

  // 支持的语言列表
  const supportedLanguages = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'C#', value: 'csharp' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'PHP', value: 'php' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'Swift', value: 'swift' },
    { label: 'Kotlin', value: 'kotlin' },
    { label: 'SQL', value: 'sql' },
    { label: 'Bash', value: 'bash' },
    { label: 'Shell', value: 'shell' },
    { label: 'JSON', value: 'json' },
    { label: 'YAML', value: 'yaml' },
    { label: 'Markdown', value: 'markdown' },
    { label: 'CSS', value: 'css' },
    { label: 'SCSS', value: 'scss' },
    { label: 'HTML', value: 'html' },
    { label: 'XML', value: 'xml' },
  ];

  const insertCodeBlock = () => {
    Modal.confirm({
      title: '插入代码块',
      content: (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            style={{ width: '100%' }}
            placeholder="选择编程语言"
            options={supportedLanguages}
            id="codeLanguage"
          />
          <Input.TextArea
            placeholder="输入代码"
            id="codeContent"
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        </Space>
      ),
      onOk: () => {
        const language = (document.getElementById('codeLanguage') as HTMLSelectElement).value;
        const code = (document.getElementById('codeContent') as HTMLTextAreaElement).value;
        if (code) {
          const codeBlock = language 
            ? `\`\`\`${language}\n${code}\n\`\`\``
            : `\`\`\`\n${code}\n\`\`\``;
          insertText(codeBlock);
        } else {
          message.warning('请输入代码内容');
        }
      },
    });
  };

  const handlePreview = () => {
    if (!content.trim()) {
      message.warning('请先输入文章内容');
      return;
    }
    setPreviewVisible(true);
  };

  const handlePreviewModeChange = (mode: 'side' | 'full') => {
    setPreviewMode(mode);
  };

  // 实现图片上传
  // const uploadProps = {
  //   action: 'https://mrcawqcwjrtspohaufbq.supabase.co/storage/v1/s3',
  //   beforeUpload: (file) => {
  //     console.log(file)
  //     // supabase.storage.from('next-blog').upload(file.name, file)
  //   }
  // }

  return (
    <div className={styles.container}>
      <Card className={styles.editorCard}>
        <div className={styles.header}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              placeholder="请输入文章标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="large"
              className={styles.titleInput}
            />
            <Space>
              <Button 
                type="primary" 
                onClick={handleSubmit} 
                loading={loading}
                icon={<SaveOutlined />}
              >
                发布文章
              </Button>
              <Button 
                onClick={handlePreview}
                icon={<EyeOutlined />}
              >
                预览文章
              </Button>
              <Upload>
              {/* <Upload {...uploadProps}> */}
                <Button icon={<UploadOutlined />}>上传封面</Button>
              </Upload>
            </Space>
            {lastSaved && (
              <div className={styles.lastSaved}>
                上次保存时间: {lastSaved.toLocaleString()}
              </div>
            )}
          </Space>
        </div>

        <div className={styles.tagsSection}>
          <Space>
            <TagsOutlined />
            {tags.map(tag => (
              <Tag 
                key={tag} 
                closable 
                onClose={() => setTags(tags.filter(t => t !== tag))}
              >
                {tag}
              </Tag>
            ))}
            <Select
              style={{ width: 120 }}
              onChange={selectChange}
              options={selectOptions}
            />
          </Space>
        </div>

        <div className={styles.toolbar}>
          <Space wrap>
            <Tooltip title="标题1">
              <Button icon={<FileTextTwoTone />} onClick={() => insertHeading(1)} />
            </Tooltip>
            <Tooltip title="标题2">
              <Button icon={<FileTextTwoTone />} onClick={() => insertHeading(2)} />
            </Tooltip>
            <Tooltip title="标题3">
              <Button icon={<FileTextTwoTone />} onClick={() => insertHeading(3)} />
            </Tooltip>
            <Tooltip title="加粗">
              <Button icon={<BoldOutlined />} onClick={() => insertText('**', '**')} />
            </Tooltip>
            <Tooltip title="斜体">
              <Button icon={<ItalicOutlined />} onClick={() => insertText('*', '*')} />
            </Tooltip>
            <Tooltip title="链接">
              <Button icon={<LinkOutlined />} onClick={insertLink} />
            </Tooltip>
            <Tooltip title="图片">
              <Button icon={<PictureOutlined />} onClick={insertImage} />
            </Tooltip>
            <Tooltip title="有序列表">
              <Button icon={<OrderedListOutlined />} onClick={() => insertText('1. ')} />
            </Tooltip>
            <Tooltip title="无序列表">
              <Button icon={<UnorderedListOutlined />} onClick={() => insertText('- ')} />
            </Tooltip>
            <Tooltip title="代码块">
              <Button icon={<CodeOutlined />} onClick={insertCodeBlock} />
            </Tooltip>
            <Tooltip title="表格">
              <Button icon={<TableOutlined />} onClick={insertTable} />
            </Tooltip>
          </Space>
        </div>

        <div className={styles.editor}>
          {isPreview ? (
            <div className={styles.preview}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeRaw,
                  [rehypeHighlight, { 
                    ignoreMissing: true,
                    subset: false
                  }],
                  rehypeSanitize
                ]}
                components={{
                  code: (props: any) => {
                    const { inline, className, children, ...rest } = props;
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
                            {...rest}
                          >
                            {String(children).replace(/\n$/, '')}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code className={styles.inlineCode} {...rest}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="开始写作..."
              className={styles.textarea}
            />
          )}
        </div>

        <Drawer
          title={
            <Space>
              <span>文章预览</span>
              <Space>
                <Button 
                  size="small" 
                  type={previewMode === 'side' ? 'primary' : 'default'}
                  onClick={() => handlePreviewModeChange('side')}
                >
                  侧边预览
                </Button>
                <Button 
                  size="small" 
                  type={previewMode === 'full' ? 'primary' : 'default'}
                  onClick={() => handlePreviewModeChange('full')}
                >
                  全屏预览
                </Button>
              </Space>
            </Space>
          }
          placement="right"
          width={previewMode === 'side' ? '50%' : '100%'}
          onClose={() => setPreviewVisible(false)}
          open={previewVisible}
          bodyStyle={{ padding: '24px' }}
        >
          <div className={styles.previewContainer}>
            <h1 className={styles.previewTitle}>{title || '无标题'}</h1>
            <div className={styles.previewMeta}>
              <Space>
                <span>发布时间：{new Date().toLocaleString()}</span>
                {tags.length > 0 && (
                  <>
                    <span>|</span>
                    <Space>
                      {tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </Space>
                  </>
                )}
              </Space>
            </div>
            <div className={styles.previewContent}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeRaw,
                  [rehypeHighlight, { 
                    ignoreMissing: true,
                    subset: false
                  }],
                  rehypeSanitize
                ]}
                components={{
                  code: (props: any) => {
                    const { inline, className, children, ...rest } = props;
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
                            {...rest}
                          >
                            {String(children).replace(/\n$/, '')}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code className={styles.inlineCode} {...rest}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </Drawer>
      </Card>
    </div>
  );
};

export default WritePage; 