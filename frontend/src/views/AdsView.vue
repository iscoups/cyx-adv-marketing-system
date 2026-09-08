<template>
  <el-card>
    <template #header>
      <div class="head">
        <span>广告管理</span>
        <el-button type="primary" @click="openDialog()">新建广告</el-button>
      </div>
    </template>

    <el-table :data="rows" border stripe v-loading="loading" style="width: 100%">
      <el-table-column prop="name" label="广告名称" min-width="160" />
      <el-table-column label="项目" min-width="150">
        <template #default="{ row }">{{ row.project?.name || '-' }}</template>
      </el-table-column>
      <el-table-column label="账号" min-width="150">
        <template #default="{ row }">{{ row.account?.name || '-' }}</template>
      </el-table-column>
      <el-table-column prop="channel" label="渠道" width="120" />
      <el-table-column prop="objective" label="目标" width="100" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column prop="budget" label="预算" width="110" />
      <el-table-column prop="spend" label="消耗" width="110" />
      <el-table-column prop="impressions" label="曝光" width="110" />
      <el-table-column prop="clicks" label="点击" width="110" />
      <el-table-column prop="conversions" label="转化" width="110" />
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="openDialog(row)">编辑</el-button>
          <el-button link type="danger" @click="removeRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog v-model="dialogVisible" :title="form.id ? '编辑广告' : '新建广告'" width="720px">
    <el-form :model="form" label-width="100px">
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="广告名称"><el-input v-model="form.name" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="渠道"><el-input v-model="form.channel" /></el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="项目">
            <el-select v-model="form.projectId" placeholder="请选择项目" style="width: 100%">
              <el-option v-for="item in projectOptions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号">
            <el-select v-model="form.accountId" placeholder="请选择账号" style="width: 100%">
              <el-option v-for="item in accountOptions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="投放目标">
            <el-select v-model="form.objective" style="width: 100%">
              <el-option label="转化" value="转化" />
              <el-option label="曝光" value="曝光" />
              <el-option label="点击" value="点击" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-select v-model="form.status" style="width: 100%">
              <el-option label="草稿" value="draft" />
              <el-option label="运行中" value="running" />
              <el-option label="暂停" value="paused" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8"><el-form-item label="预算"><el-input-number v-model="form.budget" :min="0" :precision="2" style="width: 100%" /></el-form-item></el-col>
        <el-col :span="8"><el-form-item label="消耗"><el-input-number v-model="form.spend" :min="0" :precision="2" style="width: 100%" /></el-form-item></el-col>
        <el-col :span="8"><el-form-item label="转化"><el-input-number v-model="form.conversions" :min="0" :step="1" style="width: 100%" /></el-form-item></el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12"><el-form-item label="标题包"><el-input v-model="form.titlePack" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="逻辑页"><el-input v-model="form.logicPage" /></el-form-item></el-col>
      </el-row>
      <el-form-item label="落地页"><el-input v-model="form.landingPage" /></el-form-item>
      <el-form-item label="预览地址"><el-input v-model="form.previewUrl" /></el-form-item>
      <el-form-item label="创意配置"><el-input v-model="form.creativeConfig" type="textarea" :rows="3" /></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" :loading="saving" @click="saveRow">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { api } from '@/api/endpoints';

const loading = ref(false);
const saving = ref(false);
const dialogVisible = ref(false);
const rows = ref([]);
const projects = ref([]);
const accounts = ref([]);

const form = reactive({
  id: null,
  name: '',
  projectId: '',
  accountId: '',
  channel: '',
  objective: '转化',
  titlePack: '',
  logicPage: '',
  landingPage: '',
  creativeConfig: '{}',
  status: 'draft',
  budget: 0,
  spend: 0,
  impressions: 0,
  clicks: 0,
  conversions: 0,
  previewUrl: ''
});

const projectOptions = computed(() => projects.value);
const accountOptions = computed(() => accounts.value);

const resetForm = () => {
  Object.assign(form, {
    id: null,
    name: '',
    projectId: '',
    accountId: '',
    channel: '',
    objective: '转化',
    titlePack: '',
    logicPage: '',
    landingPage: '',
    creativeConfig: '{}',
    status: 'draft',
    budget: 0,
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    previewUrl: ''
  });
};

const loadMeta = async () => {
  const [projectRes, accountRes] = await Promise.all([api.listProjects(), api.listAccounts()]);
  projects.value = projectRes.data || [];
  accounts.value = accountRes.data || [];
};

const loadData = async () => {
  loading.value = true;
  try {
    const res = await api.listAds();
    rows.value = res.data || [];
  } finally {
    loading.value = false;
  }
};

const openDialog = (row) => {
  resetForm();
  if (row) {
    Object.assign(form, {
      ...row,
      projectId: row.projectId,
      accountId: row.accountId
    });
  }
  dialogVisible.value = true;
};

const saveRow = async () => {
  saving.value = true;
  try {
    await api.saveAd({ ...form }, form.id);
    ElMessage.success('保存成功');
    dialogVisible.value = false;
    await loadData();
  } finally {
    saving.value = false;
  }
};

const removeRow = async (row) => {
  await ElMessageBox.confirm(`确认删除广告 ${row.name} 吗？`, '提示', { type: 'warning' });
  await api.deleteAd(row.id);
  ElMessage.success('删除成功');
  await loadData();
};

onMounted(async () => {
  await loadMeta();
  await loadData();
});
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
