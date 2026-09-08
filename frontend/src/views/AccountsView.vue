<template>
  <el-card>
    <template #header>
      <div class="head">
        <span>账号管理</span>
        <el-button type="primary" @click="openDialog()">新增账号</el-button>
      </div>
    </template>

    <el-table :data="rows" border stripe v-loading="loading">
      <el-table-column prop="name" label="账号名称" min-width="160" />
      <el-table-column prop="platform" label="平台" width="120" />
      <el-table-column prop="accountNo" label="账号编号" width="150" />
      <el-table-column prop="owner" label="负责人" width="120" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column prop="balance" label="余额" width="110" />
      <el-table-column prop="budget" label="预算" width="110" />
      <el-table-column prop="description" label="备注" min-width="180" />
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="openDialog(row)">编辑</el-button>
          <el-button link type="danger" @click="removeRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog v-model="dialogVisible" :title="form.id ? '编辑账号' : '新增账号'" width="560px">
    <el-form :model="form" label-width="90px">
      <el-form-item label="账号名称"><el-input v-model="form.name" /></el-form-item>
      <el-form-item label="平台"><el-input v-model="form.platform" /></el-form-item>
      <el-form-item label="账号编号"><el-input v-model="form.accountNo" /></el-form-item>
      <el-form-item label="负责人"><el-input v-model="form.owner" /></el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" style="width: 100%">
          <el-option label="启用" value="active" />
          <el-option label="停用" value="paused" />
        </el-select>
      </el-form-item>
      <el-form-item label="余额">
        <el-input-number v-model="form.balance" :min="0" :precision="2" :step="100" style="width: 100%" />
      </el-form-item>
      <el-form-item label="预算">
        <el-input-number v-model="form.budget" :min="0" :precision="2" :step="100" style="width: 100%" />
      </el-form-item>
      <el-form-item label="备注"><el-input v-model="form.description" type="textarea" :rows="3" /></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" :loading="saving" @click="saveRow">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { api } from '@/api/endpoints';

const loading = ref(false);
const saving = ref(false);
const dialogVisible = ref(false);
const rows = ref([]);
const form = reactive({
  id: null,
  name: '',
  platform: '',
  accountNo: '',
  owner: '',
  status: 'active',
  balance: 0,
  budget: 0,
  description: ''
});

const resetForm = () => {
  Object.assign(form, {
    id: null,
    name: '',
    platform: '',
    accountNo: '',
    owner: '',
    status: 'active',
    balance: 0,
    budget: 0,
    description: ''
  });
};

const loadData = async () => {
  loading.value = true;
  try {
    const res = await api.listAccounts();
    rows.value = res.data || [];
  } finally {
    loading.value = false;
  }
};

const openDialog = (row) => {
  resetForm();
  if (row) Object.assign(form, row);
  dialogVisible.value = true;
};

const saveRow = async () => {
  saving.value = true;
  try {
    await api.saveAccount({ ...form }, form.id);
    ElMessage.success('保存成功');
    dialogVisible.value = false;
    await loadData();
  } finally {
    saving.value = false;
  }
};

const removeRow = async (row) => {
  await ElMessageBox.confirm(`确认删除账号 ${row.name} 吗？`, '提示', { type: 'warning' });
  await api.deleteAccount(row.id);
  ElMessage.success('删除成功');
  await loadData();
};

onMounted(loadData);
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
