<template>
  <div>
    <h1>Sign Up</h1>
    <input v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="signup">sing up</button>

    <br/>
    <button class="bg-blue-500 justify-center items-center rounded py-5 px-3 text-white font-bold hover:shadow-md hover:-translate-y-0.5 active:shadow-none active:translate-y-0.5"
            @click="handleAdminSignUp"
            >
      管理者メール登録ボタン
    </button>

    <br/>

    <button
        class="py-5 px-3 bg-green-500 hover:shadow-md hover:-translate-y-0.5 active:shadow-node active:translate-y-0.5 rounded"
        @click="handleAdminCreateUser">
      管理者によるメールアドレス登録
    </button>
  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {CognitoUserAttribute} from "amazon-cognito-identity-js"
import {useAuth} from "~/composables/useAuth";

const {adminSignUp,adminCreateUser} = useAuth();

const nuxtApp = useNuxtApp();
const userPool = nuxtApp.$userPool;

const email = ref("");
const password = ref("");
const router = useRouter();

const signup = () =>  {
  const attributeList =[];

  const dataEmail = {
    Name: 'email',
    Value: email.value
  };

  // cognitoで設定した属性
  const attributeEmail = new CognitoUserAttribute(dataEmail)

  attributeList.push(attributeEmail)

  userPool.signUp(email.value, password.value, attributeList, null, (err, result) => {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    const cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());

    router.push({ name: 'signup-confirm', query: { email: email.value } });
  });

}


const handleAdminSignUp = async () => {
  try {
    await adminSignUp("yosukemaruyama617@gmail.com")
  } catch(error){
    console.error("Failed admin signing up", error);
  }
}


const handleAdminCreateUser = async () => {
  await adminCreateUser("yosukemaruyama617@gmail.com","DockerComposeBuild318_")

}

</script>
