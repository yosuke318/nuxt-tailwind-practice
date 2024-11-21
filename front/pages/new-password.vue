<template>
  <!--全体-->
  <div class="h-screen bg-[#f8f8f9] flex justify-center items-center">

    <!--new passwordフォーム-->
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


      <div class="self-stretch h-[228px] px-6 flex-col justify-start items-center gap-6 flex">

        <!--新しいパスワード入力項目-->
        <div class="self-stretch h-[69px] flex-col justify-start items-start gap-2 flex">
          <div class="self-stretch justify-start items-center gap-2 inline-flex">
            <div class="text-[#424753] text-xs font-medium font-['Inter'] leading-none tracking-wide">
              新しいパスワード
            </div>
          </div>

          <div class="self-stretch h-[45px] px-3 py-2.5
          bg-white rounded border border-[#c2c6d6]
          justify-end items-center gap-2 inline-flex input-container">

            <input :type="showNewPassword ? 'text' : 'password'"
                   v-model="newPassword"
                   class="w-full focus:outline-none"
            >

            <div class="w-6 h-6 relative">
              <span @click="toggleNewPasswordVisibility"
                    type="button"
                    >
                <span v-if="showNewPassword">
                  <img src="../public/open_eye.svg" alt="view password">
                </span>
                <span v-else>
                  <img src="../public/closed_eye.svg" alt="not view password">
                </span>

              </span>
            </div>
          </div>
        </div>

        <!--新しいパスワード確認入力項目-->
        <div class="self-stretch h-[69px] flex-col justify-start items-start gap-2 flex">
          <div class="self-stretch justify-start items-center gap-2 inline-flex">
            <div class="text-[#424753] text-xs font-medium font-['Inter'] leading-none tracking-wide">
              新しいパスワード確認
            </div>
          </div>

          <div
              class="self-stretch h-[45px] px-3 py-2.5
              bg-white rounded border border-[#c2c6d6]
              justify-end items-center gap-2 inline-flex input-container">
            <input :type="showNewPasswordVerify ? 'text' : 'password'"
                   v-model="newPasswordVerify"
                   class="w-full focus:outline-none"
            >

            <div class="w-6 h-6 relative">
                          <span
                              @click="toggleNewPasswordVerifyVisibility"
                              type="button"
                          >
                            <span v-if="showNewPasswordVerify">
                              <img src="../public/open_eye.svg" alt="view password">
                            </span>
                            <span v-else>
                              <img src="../public/closed_eye.svg" alt="not view password">
                            </span>
                          </span>
            </div>
          </div>
        </div>

        <div class="self-stretch h-[42px] bg-[#2271e3] rounded-lg justify-center items-center inline-flex">
          <button class="grow shrink basis-0 h-10 px-4 py-3 justify-center items-center gap-2.5 flex
            text-right text-white text-xs font-bold
            rounded-lg hover:bg-[#357CE5] active:bg-[#4588E7] bg-[#2271e3]" @click="funcSample">
            再設定
          </button>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import {ref} from 'vue'

const newPassword=ref('')
const showNewPassword = ref(false)

const newPasswordVerify = ref('')
const showNewPasswordVerify = ref(false)


const toggleNewPasswordVisibility = () => {
  showNewPassword.value = !showNewPassword.value
}

const toggleNewPasswordVerifyVisibility = () => {
  showNewPasswordVerify.value = !showNewPasswordVerify.value
}

const funcSample = () => {
  console.log(newPassword.value)
  console.log(newPasswordVerify.value)
  if (newPassword.value != newPasswordVerify.value) {
    alert("パスワードが一致しません");
    return
  }
  // todo 送信処理
}


</script>

<style scoped>

</style>