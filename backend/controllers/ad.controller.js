const db = require('../models');

exports.list = async (req, res, next) => {
  try {
    const rows = await db.Ad.findAll({
      include: [
        { model: db.Account, as: 'account' },
        { model: db.Project, as: 'project' }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json({ code: 0, message: 'ok', data: rows });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const body = req.body || {};
    const row = await db.Ad.create({
      name: body.name,
      projectId: body.projectId,
      accountId: body.accountId,
      channel: body.channel || '',
      objective: body.objective || '',
      titlePack: body.titlePack || '',
      logicPage: body.logicPage || '',
      landingPage: body.landingPage || '',
      creativeConfig: body.creativeConfig || '{}',
      status: body.status || 'draft',
      budget: body.budget || 0,
      spend: body.spend || 0,
      impressions: body.impressions || 0,
      clicks: body.clicks || 0,
      conversions: body.conversions || 0,
      previewUrl: body.previewUrl || ''
    });
    res.status(201).json({ code: 0, message: 'created', data: row });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const row = await db.Ad.findByPk(req.params.id);
    if (!row) return res.status(404).json({ code: 404, message: '广告不存在' });
    const body = req.body || {};
    await row.update({
      name: body.name,
      projectId: body.projectId,
      accountId: body.accountId,
      channel: body.channel,
      objective: body.objective,
      titlePack: body.titlePack,
      logicPage: body.logicPage,
      landingPage: body.landingPage,
      creativeConfig: body.creativeConfig,
      status: body.status,
      budget: body.budget,
      spend: body.spend,
      impressions: body.impressions,
      clicks: body.clicks,
      conversions: body.conversions,
      previewUrl: body.previewUrl
    });
    res.json({ code: 0, message: 'updated', data: row });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const row = await db.Ad.findByPk(req.params.id);
    if (!row) return res.status(404).json({ code: 404, message: '广告不存在' });
    await row.destroy();
    res.json({ code: 0, message: 'deleted' });
  } catch (error) {
    next(error);
  }
};
