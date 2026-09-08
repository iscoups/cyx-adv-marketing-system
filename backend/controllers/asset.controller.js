const path = require('path');
const db = require('../models');

exports.list = async (req, res, next) => {
  try {
    const rows = await db.Asset.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ code: 0, message: 'ok', data: rows });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const body = req.body || {};
    const row = await db.Asset.create({
      name: body.name,
      type: body.type || 'image',
      category: body.category || 'general',
      url: body.url || '',
      size: body.size || 0,
      status: body.status || 'ready',
      tag: body.tag || '',
      uploader: body.uploader || 'system',
      usageCount: body.usageCount || 0
    });
    res.status(201).json({ code: 0, message: 'created', data: row });
  } catch (error) {
    next(error);
  }
};

exports.upload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ code: 400, message: '请选择文件上传' });
    }

    const row = await db.Asset.create({
      name: req.body.name || req.file.originalname,
      type: req.body.type || path.extname(req.file.originalname).slice(1) || 'file',
      category: req.body.category || 'general',
      url: `/uploads/${req.file.filename}`,
      size: req.file.size,
      status: 'ready',
      tag: req.body.tag || '',
      uploader: req.body.uploader || 'system',
      usageCount: 0
    });

    res.status(201).json({ code: 0, message: 'uploaded', data: row });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const row = await db.Asset.findByPk(req.params.id);
    if (!row) return res.status(404).json({ code: 404, message: '素材不存在' });
    const body = req.body || {};
    await row.update({
      name: body.name,
      type: body.type,
      category: body.category,
      url: body.url,
      size: body.size,
      status: body.status,
      tag: body.tag,
      uploader: body.uploader,
      usageCount: body.usageCount
    });
    res.json({ code: 0, message: 'updated', data: row });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const row = await db.Asset.findByPk(req.params.id);
    if (!row) return res.status(404).json({ code: 404, message: '素材不存在' });
    await row.destroy();
    res.json({ code: 0, message: 'deleted' });
  } catch (error) {
    next(error);
  }
};
