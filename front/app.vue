<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="text-2xl font-bold mb-6 text-center">ログイン</h2>
        <div class="mb-4">
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
          leading-tight focus:outline-none focus:shadow-outline focus:ring-8"
                 placeholder="ユーザー名" type="text">
        </div>
        <div class="mb-6">
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
           mb-3 leading-tight focus:outline-none focus:shadow-outline text-center"
                 type="password" placeholder="パスワード">
        </div>
        <div class="flex items-center justify-center">
          <button class="hover:bg-blue-700 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            ログインボタン
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>