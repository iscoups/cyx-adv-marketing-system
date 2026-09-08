<template>
  <el-space direction="vertical" fill style="width: 100%">
    <el-row :gutter="16">
      <el-col :span="6"><el-card><el-statistic title="消耗" :value="summary.metrics.spend" /></el-card></el-col>
      <el-col :span="6"><el-card><el-statistic title="曝光" :value="summary.metrics.impressions" /></el-card></el-col>
      <el-col :span="6"><el-card><el-statistic title="点击" :value="summary.metrics.clicks" /></el-card></el-col>
      <el-col :span="6"><el-card><el-statistic title="转化" :value="summary.metrics.conversions" /></el-card></el-col>
    </el-row>

    <el-card>
      <template #header>核心效率</template>
      <el-row :gutter="16">
        <el-col :span="8"><el-statistic title="CTR" :value="summary.metrics.ctr" /></el-col>
        <el-col :span="8"><el-statistic title="CPA" :value="summary.metrics.cpa" /></el-col>
        <el-col :span="8"><el-statistic title="预算" :value="summary.metrics.budget" /></el-col>
      </el-row>
    </el-card>

    <el-card>
      <template #header>广告明细</template>
      <el-table :data="rows" border stripe>
        <el-table-column prop="name" label="广告名称" min-width="160" />
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column prop="budget" label="预算" width="110" />
        <el-table-column prop="spend" label="消耗" width="110" />
        <el-table-column prop="clicks" label="点击" width="110" />
        <el-table-column prop="conversions" label="转化" width="110" />
      </el-table>
    </el-card>
  </el-space>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { api } from '@/api/endpoints';

const rows = ref([]);
const summary = reactive({
  metrics: {
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpa: 0,
    budget: 0
  }
});

const loadData = async () => {
  const [summaryRes, adRes] = await Promise.all([api.summary(), api.listAds()]);
  Object.assign(summary.metrics, summaryRes.data.metrics || {});
  rows.value = (adRes.data || []).slice(0, 10);
};

onMounted(loadData);
</script>
