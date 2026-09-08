const bcrypt = require('bcryptjs');
const db = require('../models');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ code: 400, message: '用户名和密码不能为空' });
    }

    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ code: 401, message: '账号不存在' });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(401).json({ code: 401, message: '密码错误' });
    }

    return res.json({
      code: 0,
      message: '登录成功',
      data: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res) => {
  res.json({
    code: 0,
    message: 'ok',
    data: {
      id: 1,
      username: 'admin',
      displayName: '系统管理员',
      role: 'admin'
    }
  });
};
