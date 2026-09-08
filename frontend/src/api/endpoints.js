import request from './http';

export const api = {
  summary: () => request.get('/dashboard/summary'),
  login: (data) => request.post('/auth/login', data),
  me: () => request.get('/auth/me'),
  listAccounts: () => request.get('/accounts'),
  saveAccount: (data, id) => (id ? request.put(`/accounts/${id}`, data) : request.post('/accounts', data)),
  deleteAccount: (id) => request.delete(`/accounts/${id}`),
  listProjects: () => request.get('/projects'),
  saveProject: (data, id) => (id ? request.put(`/projects/${id}`, data) : request.post('/projects', data)),
  deleteProject: (id) => request.delete(`/projects/${id}`),
  listAssets: () => request.get('/assets'),
  saveAsset: (data, id) => (id ? request.put(`/assets/${id}`, data) : request.post('/assets', data)),
  deleteAsset: (id) => request.delete(`/assets/${id}`),
  uploadAsset: (formData) => request.post('/assets/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  listAds: () => request.get('/ads'),
  saveAd: (data, id) => (id ? request.put(`/ads/${id}`, data) : request.post('/ads', data)),
  deleteAd: (id) => request.delete(`/ads/${id}`)
};
