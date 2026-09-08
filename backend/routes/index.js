const express = require('express');
const authRoutes = require('./auth.routes');
const accountRoutes = require('./account.routes');
const assetRoutes = require('./asset.routes');
const adRoutes = require('./ad.routes');
const dashboardRoutes = require('./dashboard.routes');
const projectRoutes = require('./project.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ code: 0, message: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/accounts', accountRoutes);
router.use('/projects', projectRoutes);
router.use('/assets', assetRoutes);
router.use('/ads', adRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
