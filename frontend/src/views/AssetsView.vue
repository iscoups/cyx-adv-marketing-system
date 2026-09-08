<template>
  <el-card>
    <template #header>
      <div class="head">
        <span>素材中心</span>
        <el-button type="primary" @click="openDialog()">上传素材</el-button>
      </div>
    </template>

    <el-table :data="rows" border stripe v-loading="loading">
      <el-table-column prop="name" label="素材名称" min-width="160" />
      <el-table-column prop="type" label="类型" width="100" />
      <el-table-column prop="category" label="分类" width="120" />
      <el-table-column prop="tag" label="标签" min-width="160" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column prop="uploader" label="上传人" width="120" />
      <el-table-column prop="usageCount" label="使用次数" width="110" />
      <el-table-column label="链接" min-width="200">
        <template #default="{ row }">
          <el-link :href="row.url" target="_blank">{{ row.url }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="openDialog(row)">编辑</el-button>
          <el-button link type="danger" @click="removeRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog v-model="dialogVisible" :title="form.id ? '编辑素材' : '上传素材'" width="560px">
    <el-form :model="form" label-width="90px">
      <el-form-item label="素材名称"><el-input v-model="form.name" /></el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" style="width: 100%">
          <el-option label="图片" value="image" />
          <el-option label="视频" value="video" />
          <el-option label="文案" value="text" />
          <el-option label="文件" value="file" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类"><el-input v-model="form.category" /></el-form-item>
      <el-form-item label="标签"><el-input v-model="form.tag" /></el-form-item>
      <el-form-item label="上传人"><el-input v-model="form.uploader" /></el-form-item>
      <el-form-item label="文件">
        <input type="file" @change="handleFileChange" />
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="form.url" placeholder="未上传时可填写外链地址" />
      </el-form-item>
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
const selectedFile = ref(null);
const form = reactive({
  id: null,
  name: '',
  type: 'image',
  category: 'general',
  tag: '',
  uploader: 'system',
  url: ''
});

const resetForm = () => {
  selectedFile.value = null;
  Object.assign(form, {
    id: null,
    name: '',
    type: 'image',
    category: 'general',
    tag: '',
    uploader: 'system',
    url: ''
  });
};

const loadData = async () => {
  loading.value = true;
  try {
    const res = await api.listAssets();
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

const handleFileChange = (event) => {
  selectedFile.value = event.target.files?.[0] || null;
};

const saveRow = async () => {
  saving.value = true;
  try {
    if (selectedFile.value) {
      const payload = new FormData();
      payload.append('file', selectedFile.value);
      payload.append('name', form.name);
      payload.append('type', form.type);
      payload.append('category', form.category);
      payload.append('tag', form.tag);
      payload.append('uploader', form.uploader);
      await api.uploadAsset(payload);
    } else {
      await api.saveAsset({ ...form }, form.id);
    }
    ElMessage.success('保存成功');
    dialogVisible.value = false;
    await loadData();
  } finally {
    saving.value = false;
  }
};

const removeRow = async (row) => {
  await ElMessageBox.confirm(`确认删除素材 ${row.name} 吗？`, '提示', { type: 'warning' });
  await api.deleteAsset(row.id);
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
