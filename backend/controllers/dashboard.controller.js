const db = require('../models');

exports.summary = async (req, res, next) => {
  try {
    const [accountCount, projectCount, assetCount, adCount] = await Promise.all([
      db.Account.count(),
      db.Project.count(),
      db.Asset.count(),
      db.Ad.count()
    ]);

    const ads = await db.Ad.findAll();
    const spend = ads.reduce((sum, item) => sum + Number(item.spend || 0), 0);
    const budget = ads.reduce((sum, item) => sum + Number(item.budget || 0), 0);
    const clicks = ads.reduce((sum, item) => sum + Number(item.clicks || 0), 0);
    const impressions = ads.reduce((sum, item) => sum + Number(item.impressions || 0), 0);
    const conversions = ads.reduce((sum, item) => sum + Number(item.conversions || 0), 0);

    res.json({
      code: 0,
      message: 'ok',
      data: {
        totals: { accountCount, projectCount, assetCount, adCount },
        metrics: {
          spend,
          budget,
          clicks,
          impressions,
          conversions,
          ctr: impressions ? Number(((clicks / impressions) * 100).toFixed(2)) : 0,
          cpa: conversions ? Number((spend / conversions).toFixed(2)) : 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
