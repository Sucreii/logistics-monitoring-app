import type { AxiosInstance } from 'axios'
import axios from 'axios'

export const HTTP_API = (): AxiosInstance => {
  const defaultHeaders = {
    'ngrok-skip-browser-warning': true,
  }

  const webAxiosInstance: AxiosInstance = axios.create({
    headers: defaultHeaders,
    baseURL: process.env.BASE_URL || '',
    withCredentials: true,
  })

  return webAxiosInstance
}