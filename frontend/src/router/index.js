import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import DashboardView from '@/views/DashboardView.vue';
import AccountsView from '@/views/AccountsView.vue';
import ProjectsView from '@/views/ProjectsView.vue';
import AdsView from '@/views/AdsView.vue';
import AssetsView from '@/views/AssetsView.vue';
import DataCenterView from '@/views/DataCenterView.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'dashboard', component: DashboardView },
      { path: 'accounts', name: 'accounts', component: AccountsView },
      { path: 'projects', name: 'projects', component: ProjectsView },
      { path: 'ads', name: 'ads', component: AdsView },
      { path: 'assets', name: 'assets', component: AssetsView },
      { path: 'data-center', name: 'data-center', component: DataCenterView }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});

