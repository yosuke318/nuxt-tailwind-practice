<!-- index.vue -->
<template>
  <!--  全体  -->
  <div class="h-screen bg-[#f8f8f9] flex justify-center items-center">

    <!--サインアップフォーム-->
    <div class="w-[400px] py-6 bg-white rounded-lg flex-col justify-start items-start gap-6 inline-flex">

      <!--todo アイコンと文字-->
      <div class="self-stretch h-[34.29px] px-6 flex-col justify-start items-center gap-1.5 flex">
        <div class="justify-start items-end gap-6 inline-flex">
          <img class="w-[120px] h-[34.29px]" src="../public/kariru_logo.svg" alt="Icon"/>
          <div class="text-[#727785] text-sm font-bold font-['Inter'] leading-tight tracking-wide">
            For Example
          </div>
        </div>
      </div>

      <!--ボーダー部分-->
      <div class="self-stretch h-px flex-col justify-center items-start flex">
        <div class="self-stretch h-[0px] border border-[#e1e2ec]"></div>
      </div>

      <!--入力項目とボタンの親要素-->
      <div class="self-stretch h-[390px] px-6 flex-col justify-start items-start gap-6 flex">


        <!--メールアドレス部分      -->
        <div
            class="w-full h-[45px] px-3 py-2.5 bg-[#2271e3]/5 rounded border border-[#ecedf7] justify-start items-center gap-2 inline-flex">
          <div class="w-7 h-7 p-[2.92px] justify-center items-center flex">
            <img src="../public/account.png" alt="account icon"/>
          </div>
          <div
              class="grow shrink basis-0 text-[#424753] text-sm font-normal font-['Inter'] leading-[21px] tracking-tight">
            {{ email }}
          </div>
        </div>


        <!--氏名部分-->
        <div class="self-stretch h-[69px] flex-col justify-start items-start gap-2 flex">
          <div class="self-stretch justify-start items-center gap-2 inline-flex">
            <div class="text-[#424753] text-xs font-medium font-['Inter'] leading-none tracking-wide">
              氏名
            </div>
          </div>
          <div class="self-stretch h-[45px] px-3 py-2.5
              bg-white rounded border border-[#c2c6d6]
              justify-end items-center gap-2 inline-flex input-container">
            <input type="text"
                   v-model="userName"
                   class="w-full focus:outline-none"
            >
          </div>
        </div>

        <!--パスワード部分   -->
        <div class="self-stretch h-[69px] flex-col justify-start items-start gap-2 flex">
          <div class="self-stretch justify-start items-center gap-2 inline-flex">
            <div class="text-[#424753] text-xs font-medium font-['Inter'] leading-none tracking-wide">
              パスワード
            </div>
          </div>

          <div
              class="self-stretch h-[45px] px-3 py-2.5
              bg-white rounded border border-[#c2c6d6]
              justify-end items-center gap-2 inline-flex input-container">
            <input :type="showPassword ? 'text' : 'password'"
                   v-model="password"
                   class="w-full focus:outline-none"
            >

            <div class="w-6 h-6 relative">
                          <span
                              @click="togglePasswordVisibility"
                              type="button"
                          >
                            <span v-if="showPassword">
                              <img src="../public/open_eye.svg" alt="view password">
                            </span>
                            <span v-else>
                              <img src="../public/closed_eye.svg" alt="not view password">
                            </span>
                          </span>
            </div>
          </div>
        </div>


        <!--パスワード確認部分   -->
        <div class="self-stretch h-[69px] flex-col justify-start items-start gap-2 flex">
          <div class="self-stretch justify-start items-center gap-2 inline-flex">
            <div class="text-[#424753] text-xs font-medium font-['Inter'] leading-none tracking-wide">
              パスワード確認
            </div>
          </div>

          <div
              class="self-stretch h-[45px] px-3 py-2.5
              bg-white rounded border border-[#c2c6d6]
              justify-end items-center gap-2 inline-flex input-container">
            <input :type="showPasswordVerify ? 'text' : 'password'"
                   v-model="passwordVerify"
                   class="w-full focus:outline-none"
            >

            <div class="w-6 h-6 relative">
                          <span
                              @click="togglePasswordVerifyVisibility"
                              type="button"
                          >
                            <span v-if="showPasswordVerify">
                              <img src="../public/open_eye.svg" alt="view password">
                            </span>
                            <span v-else>
                              <img src="../public/closed_eye.svg" alt="not view password">
                            </span>
                          </span>
            </div>
          </div>
        </div>

        <!--アカウント登録ボタン部分-->
        <div class="self-stretch h-[42px] bg-[#2271e3] rounded-lg justify-center items-center inline-flex">

          <button class="grow shrink basis-0 h-10 px-4 py-3 justify-center items-center gap-2.5 flex
            text-right text-white text-xs font-bold
            rounded-lg hover:bg-[#357CE5] active:bg-[#4588E7] bg-[#2271e3]" @click="funcSample">
            登録
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import {ref, computed} from 'vue'

const userName = ref('')
const password = ref('')
const passwordVerify = ref('')
const showPassword = ref(false)
const showPasswordVerify = ref(false)
const email = ref('sample@emial.com')


const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const togglePasswordVerifyVisibility = () => {
  showPasswordVerify.value = !showPasswordVerify.value
}


const funcSample = () => {
  console.log(userName.value)
  console.log(password.value)
  console.log(passwordVerify.value)
}


</script>

<style>
.input-container:focus-within {
  border-color: blue;
  transition: border-color 0.3s ease;
}
</style>