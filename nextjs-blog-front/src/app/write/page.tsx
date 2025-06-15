'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button, Input, message, Space, Card, Tag, Modal, Upload } from 'antd';
import { SaveOutlined, EyeOutlined, UploadOutlined, TagsOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import styles from './page.module.scss';

// 动态导入 MD 编辑器组件，避免 SSR 问题
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

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
                onClick={() => setIsPreview(!isPreview)}
                icon={<EyeOutlined />}
              >
                {isPreview ? '编辑模式' : '预览模式'}
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
            <Input
              placeholder="添加标签"
              onPressEnter={(e) => {
                const input = e.target as HTMLInputElement;
                if (input.value.trim()) {
                  handleAddTag(input.value.trim());
                  input.value = '';
                }
              }}
              style={{ width: 100 }}
            />
          </Space>
        </div>

        <div className={styles.editor}>
          <MDEditor
            value={content}
            onChange={setContent}
            height={600}
            preview={isPreview ? 'preview' : 'edit'}
            hideToolbar={false}
            enableScroll={true}
            textareaProps={{
              placeholder: '开始写作...',
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default WritePage; 