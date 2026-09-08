const db = require('../models');

exports.list = async (req, res, next) => {
  try {
    const rows = await db.Project.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ code: 0, message: 'ok', data: rows });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const body = req.body || {};
    const row = await db.Project.create({
      name: body.name,
      clientName: body.clientName || '',
      owner: body.owner || 'system',
      status: body.status || 'active',
      budget: body.budget || 0,
      startDate: body.startDate || null,
      endDate: body.endDate || null,
      description: body.description || ''
    });
    res.status(201).json({ code: 0, message: 'created', data: row });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const row = await db.Project.findByPk(req.params.id);
    if (!row) return res.status(404).json({ code: 404, message: '项目不存在' });
    const body = req.body || {};
    await row.update({
      name: body.name,
      clientName: body.clientName,
      owner: body.owner,
      status: body.status,
      budget: body.budget,
      startDate: body.startDate,
      endDate: body.endDate,
      description: body.description
    });
    res.json({ code: 0, message: 'updated', data: row });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const row = await db.Project.findByPk(req.params.id);
    if (!row) return res.status(404).json({ code: 404, message: '项目不存在' });
    await row.destroy();
    res.json({ code: 0, message: 'deleted' });
  } catch (error) {
    next(error);
  }
};
