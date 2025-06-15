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
  FileTextOutlined,
  FileMarkdownOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FileZipOutlined,
  FileUnknownOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  FileExclamationOutlined,
  FileProtectOutlined,
  FileTextTwoTone,
  FileMarkdownTwoTone,
  FileImageTwoTone,
  FilePdfTwoTone,
  FileWordTwoTone,
  FileExcelTwoTone,
  FilePptTwoTone,
  FileZipTwoTone,
  FileUnknownTwoTone,
  FileAddTwoTone,
  FileSearchTwoTone,
  FileSyncTwoTone,
  FileExclamationTwoTone,
  FileProtectTwoTone,
  FilterTwoTone,
  FileTwoTone,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import styles from './page.module.scss';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';

const selectOptions = [
  {
    label: '技术',
    value: 'technology'
  },
  {
    label: '旅行',
    value: 'travel'
  },
  {
    label: '随笔',
    value: 'essays'
  },
  {
    label: '摄影',
    value: 'photography'
  },
  {
    label: '阅读',
    value: 'reading'
  },
  {
    label: '音乐',
    value: 'music'
  }
];

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewMode, setPreviewMode] = useState<'side' | 'full'>('side');

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

  // 图片上传配置
  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/upload', // TODO: 实现图片上传接口
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        const imageUrl = info.file.response.url;
        const imageMarkdown = `![${info.file.name}](${imageUrl})`;
        setContent(prev => prev + '\n' + imageMarkdown);
        message.success('图片上传成功');
      } else if (info.file.status === 'error') {
        message.error('图片上传失败');
      }
    },
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      message.error('请输入文章标题');
      return;
    }
    if (!content.trim()) {
      message.error('请输入文章内容');
      return;
    }

    setLoading(true);
    try {
      // TODO: 实现文章保存逻辑
      message.success('文章发布成功！');
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

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

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
                onClick={handleSaveDraft}
                icon={<SaveOutlined />}
              >
                保存草稿
              </Button>
              <Button 
                onClick={handlePreview}
                icon={<EyeOutlined />}
              >
                预览文章
              </Button>
              <Upload {...uploadProps}>
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
              mode="multiple"
              style={{ width: '100%', minWidth: 150 }}
              placeholder="请选择标签"
              onChange={handleChange}
              options={selectOptions}
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.data.label}>
                    {option.data.label}
                  </span>
                </Space>
              )}
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