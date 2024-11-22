<template>
  <div>
    <h1>Reset Password</h1>
    <input v-model="email" placeholder="Email" />
    <button @click="sendCode">Send Verification Code</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {CognitoUser} from 'amazon-cognito-identity-js';

const nuxtApp = useNuxtApp();
const userPool = nuxtApp.$userPool;

const email = ref('');
const router = useRouter();

const sendCode= () => {
  const userData = {
    Username: email.value,
    Pool:userPool,
  };
  const cognitoUser = new CognitoUser(userData)

  cognitoUser.forgotPassword({
    onSuccess: () => {
      router.push({name:'reset-password-confirm', query: {email:email.value}});
    },
    onFailure: (err) => {
      alert(err.message || JSON.stringify(err));
      console.log('Error:', err);
    }
  })
}

</script>

<style scoped>

</style>