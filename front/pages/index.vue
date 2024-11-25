<!-- index.vue -->
<template>

  <h1>サインアップ</h1>
  <nuxt-link to="/signup-sample">signup sample</nuxt-link>
  <h1>ログイン</h1>
  <nuxt-link to="/login-sample">login sample</nuxt-link>
  <h1>新しいパスワード</h1>
  <nuxt-link to="/new-password">newpassword sample</nuxt-link>

  <h1>新しいメールアドレス</h1>
  <nuxt-link to="/new-mail">new mail address sample</nuxt-link>

<p>----------------------------------------------------------</p>

  <p style="color:green">ここからは検証</p>
  <h1>Landing Page</h1>
  <nuxt-link to="/login" style="color:green">Login</nuxt-link>

  <h1>Signup</h1>
  <nuxt-link to="/signup" style="color:green">signup</nuxt-link>
  <br/>

  <button class="items-center justify-center bg-blue-500 py-4 px-2 text-white font-bold rounded hover:shadow-md hover:-translate-y-0.5 active:shadow-none active:translate-y-0.5"
  @click="clearSessionStorageId">
    セッションストレージのIDクリア
  </button>
</template>

<script setup lang="ts">


const clearSessionStorageId = () => {
  sessionStorage.clear()
  window.location.href = "/login-sample"
}
</script>