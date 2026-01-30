<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useValidationRules } from 'src/utils/fields/rules';
import { useAuthStore } from 'src/stores/LoginAuth';
import { Loading, QSpinnerGears } from 'quasar';
import { useQuasar } from 'quasar';

const { rules } = useValidationRules();
const router = useRouter();
const authStore = useAuthStore();
const $q = useQuasar();
const credentials = ref({
  username: '',
  password: '',
});

const onSubmit = async () => {
  Loading.show({
    spinner: QSpinnerGears,
    message: 'Authenticating... please wait.',
    backgroundColor: 'grey-10',
  });

  try {
    const result = await authStore.login(credentials.value);
    Loading.hide();

    if (result.message === 'Login successful') {
      console.log('I AM SUCCESSFUL');

      $q.dialog({
        title: 'Login Successful',
        message: 'Welcome!',
      }).onOk(() => {
        console.log('OK clicked, attempting redirect...');
        void router.replace({ name: 'home.dashboard' });
      });
    }
  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    Loading.hide();
  }
};
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="q-pa-md login-parent" flat>
          <q-card-section class="q-pb-none">
            <div class="text-center text-h6 login-text">Login</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="onSubmit">
              <q-input
                v-model="credentials.username"
                label="Username"
                :rules="rules.requiredRules"
              />
              <q-input
                class="q-mt-md"
                v-model="credentials.password"
                label="Password"
                type="password"
                :rules="rules.requiredRules"
              />
              <q-btn
                type="submit"
                label="Login"
                color="primary"
                class="q-mt-md full-width login-button"
                :loading="authStore.loading"
                push
              />
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

  .login-parent {
    width: 400px;
    border-radius: 10px;
  }
  .login-button {
    height: 50px;
    border-radius: 10px;
  }
}
</style>
