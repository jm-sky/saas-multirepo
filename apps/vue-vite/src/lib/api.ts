import axios from 'axios'
import { TOKEN_STORAGE_KEY } from '@/config'

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY)

apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export { apiClient }
