<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useValidationRules } from 'src/utils/fields/rules'
import { useAuthStore } from 'src/stores/LoginAuth'

const router = useRouter()
const { rules } = useValidationRules()
const authStore = useAuthStore()

const credentials = ref({
  username: '',
  password: '',
})

const onSubmit = async () => {
  try {
    const result = await authStore.login(credentials.value)
    console.log('result', result)
    if (result.code === 200) {
      await router.replace({ name: 'home.dashboard' })
      return
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <q-layout view="lHh Lpr lFf"> 
    <q-page-container> 
      <q-page class="flex flex-center">
        <q-card class="q-pa-md login-parent-card" flat>
          <q-card-section class="q-pb-none">
            <div class="text-center text-h6 login-text">Login</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="onSubmit">
              <q-input v-model="credentials.username" label="Username" :rules="rules.requiredRules" />
              <q-input class="q-mt-md" v-model="credentials.password" label="Password" type="password"
                :rules="rules.requiredRules" />
              <q-btn type="submit" label="Login" color="primary" class="q-mt-md full-width login-button" push />
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<style scoped>
.q-page {
  background: #e9eaec;

  .login-parent-card {
    width: 400px;
    border-radius: 10px;
  }

  .login-button {
    height: 50px;
    border-radius: 10px;
  }
}
</style>
