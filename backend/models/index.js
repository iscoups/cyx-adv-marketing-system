const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');
const User = require('./User');
const Account = require('./Account');
const Project = require('./Project');
const Asset = require('./Asset');
const Ad = require('./Ad');

User.hasMany(Ad, { foreignKey: 'accountId', as: 'ads' });
Account.hasMany(Ad, { foreignKey: 'accountId', as: 'ads' });
Project.hasMany(Ad, { foreignKey: 'projectId', as: 'ads' });
Ad.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });
Ad.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

const db = {
  sequelize,
  User,
  Account,
  Project,
  Asset,
  Ad
};

db.syncAndSeed = async () => {
  await sequelize.sync();

  const [admin] = await User.findOrCreate({
    where: { username: 'admin' },
    defaults: {
      password: await bcrypt.hash('Admin@123456', 10),
      displayName: '系统管理员',
      role: 'admin',
      status: 1
    }
  });

  const [account1] = await Account.findOrCreate({
    where: { accountNo: 'TT-2026001' },
    defaults: {
      name: '巨量引擎-主账号',
      platform: '巨量引擎',
      owner: '运营一组',
      status: 'active',
      balance: 12800.5,
      budget: 50000,
      description: '主投放账户'
    }
  });

  const [account2] = await Account.findOrCreate({
    where: { accountNo: 'KS-2026002' },
    defaults: {
      name: '快手-品牌账号',
      platform: '快手',
      owner: '运营二组',
      status: 'active',
      balance: 8600,
      budget: 30000,
      description: '品牌活动账户'
    }
  });

  const [project1] = await Project.findOrCreate({
    where: { name: '夏季拉新项目' },
    defaults: {
      clientName: 'CYX 科技',
      owner: '代理商A',
      status: 'active',
      budget: 80000,
      startDate: '2026-09-01',
      endDate: '2026-10-15',
      description: '首批拉新投放'
    }
  });

  const [project2] = await Project.findOrCreate({
    where: { name: '品牌曝光项目' },
    defaults: {
      clientName: 'CYX 科技',
      owner: '运营组',
      status: 'paused',
      budget: 40000,
      startDate: '2026-09-10',
      endDate: '2026-11-01',
      description: '品牌曝光与再营销'
    }
  });

  await Asset.findOrCreate({
    where: { name: '主视觉-01' },
    defaults: {
      type: 'image',
      category: '主视觉',
      url: '/uploads/demo-cover-01.png',
      size: 224588,
      status: 'ready',
      tag: '转化,新品',
      uploader: admin.username,
      usageCount: 2
    }
  });

  await Asset.findOrCreate({
    where: { name: '短视频-01' },
    defaults: {
      type: 'video',
      category: '短视频',
      url: '/uploads/demo-video-01.mp4',
      size: 5648822,
      status: 'ready',
      tag: '曝光,品牌',
      uploader: admin.username,
      usageCount: 1
    }
  });

  await Ad.findOrCreate({
    where: { name: '夏季拉新-信息流A' },
    defaults: {
      projectId: project1.id,
      accountId: account1.id,
      channel: '巨量引擎',
      objective: '转化',
      titlePack: '高转化标题包',
      logicPage: '表单收集页',
      landingPage: 'https://example.com/landing',
      creativeConfig: JSON.stringify({ headline: '限时福利', format: 'single_image' }),
      status: 'running',
      budget: 12000,
      spend: 4830,
      impressions: 98213,
      clicks: 3721,
      conversions: 286,
      previewUrl: 'https://example.com/preview/1'
    }
  });

  await Ad.findOrCreate({
    where: { name: '品牌曝光-视频B' },
    defaults: {
      projectId: project2.id,
      accountId: account2.id,
      channel: '快手',
      objective: '曝光',
      titlePack: '品牌曝光标题包',
      logicPage: '品牌故事页',
      landingPage: 'https://example.com/brand',
      creativeConfig: JSON.stringify({ headline: '品牌焕新', format: 'video' }),
      status: 'draft',
      budget: 20000,
      spend: 1820,
      impressions: 62188,
      clicks: 1612,
      conversions: 64,
      previewUrl: 'https://example.com/preview/2'
    }
  });
};

module.exports = db;
