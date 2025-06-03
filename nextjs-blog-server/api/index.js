const express = require('express');
const router = express.Router();

// 导入各个路由模块
const testRoutes = require('./test');
const userRoutes = require('./users');

// 注册路由
router.use('/test', testRoutes);
router.use('/users', userRoutes);

// API 根路径的响应
router.get('/', (req, res) => {
  res.json({
    message: 'API 服务正常运行',
    version: '1.0.0'
  });
});

module.exports = router; 