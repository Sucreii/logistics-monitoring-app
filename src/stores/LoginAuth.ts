import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import { HTTP_API } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import CryptoJS from 'crypto-js' 

const SECRET_KEY = '123-123-123'

export const useAuthStore = defineStore('authStore', () => {
  type CredentialsType = {
    username: string
    password: string
  }

  const cookies = useCookies()
  const router = useRouter();
  const encrypt = (data: string) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
  }

  const decrypt = (data: string) => {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  const getUserFromCookie = () => {
    const encryptedUser = cookies.get('user')
    if (encryptedUser) {
      try {
        return JSON.parse(decrypt(encryptedUser))
      } catch (err) {
        console.error('Failed to decrypt user data:', err)
      }
    }
    return null
  }

  const user = getUserFromCookie()

  const login = async (payload: CredentialsType) => {
    try {
      const response = await HTTP_API().post('/api/auth/login', payload)
      if (response.data?.results) {
        const userData = response.data.results
        cookies.set('user', encrypt(JSON.stringify(userData)), {
          secure: true,
        })
      }
      return response.data
    } catch (err) {
      console.error('Login Error:', err)
      throw new Error('Login failed. Please try again.')
    }
  }

  const logout = async () => {
    try {
      const response = await HTTP_API().get('/api/auth/logout')
      console.log('response', response)

      if (response.status === 200) {
        cookies.remove('user')
        await router.replace({ name: 'auth.page' })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return {
    login,
    logout,
    user,
  }
})