# Node.js 服务端应用

这是一个基于 Express.js 的 Node.js 服务端应用程序。

## 功能特性

- Express.js 框架
- CORS 支持
- 日志记录 (Morgan)
- 环境变量配置
- 错误处理中间件
- JSON 请求体解析

## 安装

```bash
# 安装依赖
npm install

# 开发环境运行（支持热重载）
npm run dev

# 生产环境运行
npm start
```

## API 端点

- GET `/` - 欢迎页面
- GET `/api/test` - 测试 API 端点

## 环境变量

创建 `.env` 文件并配置以下环境变量：

```
PORT=3000
NODE_ENV=development
``` 