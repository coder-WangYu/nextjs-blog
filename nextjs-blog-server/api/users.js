const express = require('express');
const router = express.Router();

// 模拟用户数据
const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', age: 25 },
  { id: 2, name: '李四', email: 'lisi@example.com', age: 30 },
  { id: 3, name: '王五', email: 'wangwu@example.com', age: 28 }
];

// 获取用户列表
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    data: users
  });
});

// 获取单个用户
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json({
      status: 'success',
      data: user
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: '用户不存在'
    });
  }
});

// 创建新用户
router.post('/', (req, res) => {
  const { name, email, age } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      status: 'error',
      message: '名字和邮箱是必填项'
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    age: age || null
  };

  users.push(newUser);
  
  res.status(201).json({
    status: 'success',
    data: newUser
  });
});

module.exports = router; 