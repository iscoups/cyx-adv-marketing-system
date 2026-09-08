<template>
  <el-container class="shell">
    <el-aside width="220px" class="aside">
      <div class="brand">CYX Ads</div>
      <el-menu router :default-active="$route.path" class="menu">
        <el-menu-item index="/">总览</el-menu-item>
        <el-menu-item index="/accounts">账号管理</el-menu-item>
        <el-menu-item index="/projects">项目管理</el-menu-item>
        <el-menu-item index="/ads">广告管理</el-menu-item>
        <el-menu-item index="/assets">素材中心</el-menu-item>
        <el-menu-item index="/data-center">数据中心</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="title">一站式广告营销投放系统</div>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  background: #f5f7fa;
}

.aside {
  background: #fff;
  border-right: 1px solid #e6e8ee;
}

.brand {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-weight: 700;
  color: #1f2d3d;
  border-bottom: 1px solid #eef0f3;
}

.menu {
  border-right: none;
}

.header {
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e6e8ee;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.main {
  padding: 20px;
}
</style>
