<template>

  <div>
    <h1>Confirm Signup</h1>
    <input v-model="email" placeholder="Email" disabled/>
    <input v-model="code" placeholder="Verification Code"/>
    <button @click="confirm"> Confirm</button>
  </div>
</template>


<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router';
import {CognitoUser} from 'amazon-cognito-identity-js';

const nuxtApp = useNuxtApp();
const userPool = nuxtApp.$userPool;

const email = ref('')
const code = ref('')
const router = useRouter();
const route = useRoute();

onMounted(()=>{
  email.value = route.query.email;
});

const confirm = () => {
  const userData = {
    Username: email.value,
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.confirmRegistration(code.value, true, (err, result) => {
    if(err) {
      alert(err.message || JSON.stringfy(err));
      return;
    }
    alert('Account verified successfully!');
    router.push('/login');
  });
};
</script>


<style scoped>

</style>