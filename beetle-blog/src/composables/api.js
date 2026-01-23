import axios from 'axios'
import { useUserStore } from '@/stores/user'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

authApi.interceptors.request.use((config) => {
  const user = useUserStore()
  config.headers.Authorization = `Bearer ${user.token}`
  return config
})

export const useApi = () => {
  return { api, authApi }
}
