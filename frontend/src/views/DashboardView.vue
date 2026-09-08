<template>
  <el-space direction="vertical" fill style="width: 100%">
    <el-row :gutter="16">
      <el-col :span="6">
        <el-card><el-statistic title="账号数" :value="summary.totals.accountCount" /></el-card>
      </el-col>
      <el-col :span="6">
        <el-card><el-statistic title="项目数" :value="summary.totals.projectCount" /></el-card>
      </el-col>
      <el-col :span="6">
        <el-card><el-statistic title="素材数" :value="summary.totals.assetCount" /></el-card>
      </el-col>
      <el-col :span="6">
        <el-card><el-statistic title="广告数" :value="summary.totals.adCount" /></el-card>
      </el-col>
    </el-row>

    <el-card>
      <template #header>投放核心指标</template>
      <el-row :gutter="16">
        <el-col :span="6"><el-statistic title="消耗" :value="summary.metrics.spend" /></el-col>
        <el-col :span="6"><el-statistic title="预算" :value="summary.metrics.budget" /></el-col>
        <el-col :span="6"><el-statistic title="点击" :value="summary.metrics.clicks" /></el-col>
        <el-col :span="6"><el-statistic title="转化" :value="summary.metrics.conversions" /></el-col>
      </el-row>
      <div class="subline">CTR {{ summary.metrics.ctr }}% / CPA {{ summary.metrics.cpa }}</div>
    </el-card>
  </el-space>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { api } from '@/api/endpoints';

const summary = reactive({
  totals: {
    accountCount: 0,
    projectCount: 0,
    assetCount: 0,
    adCount: 0
  },
  metrics: {
    spend: 0,
    budget: 0,
    clicks: 0,
    impressions: 0,
    conversions: 0,
    ctr: 0,
    cpa: 0
  }
});

const loadSummary = async () => {
  const res = await api.summary();
  Object.assign(summary.totals, res.data.totals || {});
  Object.assign(summary.metrics, res.data.metrics || {});
};

onMounted(loadSummary);
</script>

<style scoped>
.subline {
  margin-top: 12px;
  color: #606266;
  font-size: 13px;
}
</style>
