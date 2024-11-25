<template>
  <!--全体-->
  <div class="h-screen bg-[#f8f8f9] flex justify-center items-center">

    <!--コンテナ-->
    <div class="w-[400px] py-6 bg-white rounded-lg flex-col justify-start items-start gap-6 inline-flex">


      <!--todo アイコンと文字-->
      <div class="self-stretch h-[34.29px] px-6 flex-col justify-start items-center gap-1.5 flex">
        <div class="justify-start items-end gap-6 inline-flex">
          <img class="w-[120px] h-[34.29px]" src="../public/kariru_logo.svg"/>
          <div class="text-[#727785] text-sm font-bold font-['Inter'] leading-tight tracking-wide">
            For Example
          </div>
        </div>
      </div>

      <!--ボーダー-->
      <div class="self-stretch h-px flex-col justify-center items-start flex">
        <div class="self-stretch h-[0px] border border-[#e1e2ec]"></div>
      </div>

      <!--入力項目とボタンの親要素-->
      <div class="self-stretch h-[284px] px-6 flex-col justify-start items-center gap-6 flex">

        <!--メールアドレス部分-->
        <div class="self-stretch h-[69px] flex-col justify-start items-start gap-2 flex">
          <div class="self-stretch justify-start items-center gap-2 inline-flex">
            <div class="text-[#424753] text-xs font-medium font-['Inter'] leading-none tracking-wide">
              メールアドレス
            </div>
          </div>

          <div class="self-stretch h-[45px] px-3 py-2.5
              bg-white rounded border border-[#c2c6d6]
              justify-end items-center gap-2 inline-flex input-container">
            <input type="text"
                   class="w-full focus:outline-none"
                   v-model="email"
            >
          </div>
        </div>


        <div class="self-stretch h-[69px] flex-col justify-start items-start gap-2 flex">
          <div class="self-stretch justify-start items-center gap-2 inline-flex">
            <div class="text-[#424753] text-xs font-medium font-['Inter'] leading-none tracking-wide">
              パスワード
            </div>
          </div>
          <div class="self-stretch h-[45px] px-3 py-2.5
               bg-white rounded border border-[#c2c6d6]
               justify-end items-center gap-2 inline-flex input-container">

            <input :type="showPassword ? 'text' : 'password'"
                   v-model="password"
                   class="w-full focus:outline-none"
            >

            <div class="w-6 h-6 relative">
              <span @click="togglePasswordVisibility"
                    class="tw-absolute"
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

        <!--ログインボタン-->
        <div class="self-stretch h-[42px] bg-white rounded-lg justify-center items-center inline-flex">

          <button class="grow shrink basis-0 h-10 px-4 py-3 justify-center items-center gap-2.5 flex
            text-right text-white text-xs font-bold
            rounded-lg hover:bg-[#357CE5] active:bg-[#4588E7] bg-[#2271e3]"
                  @click="handleSignIn"
          >
            ログイン
          </button>

        </div>

        <!--パスワードリセットページへのリンク-->
        <div class="h-8 rounded justify-center items-center inline-flex">
          <div class="self-stretch pl-1.5 pr-2 py-1 justify-center items-center gap-1.5 flex">
            <a href="/signup-sample"
               class="text-center text-[#2271e3] text-xs font-bold font['Inter'] underline
               leading-none tracking-none tracking-wide inline-block"
               aria-label="パスワードリセットページへ">
              パスワードを忘れた方はこちら
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue'

// todo 認証系の処理がuseAuth.tsに書かれているが、その配置場所について考慮中
import {useAuth} from "~/composables/useAuth";

const {signIn} = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

/**
 * wip ログイン処理
 */
const handleSignIn = async () => {

  try {
    console.log("1111111");
    // 認証処理を行う
    const session = await signIn(email.value, password.value);
    console.log("Sign in successful", session?.AccessToken);
    if (session && typeof session.AccessToken !== "undefined") {
      sessionStorage.setItem("accessToken", session.AccessToken);
      if (sessionStorage.getItem("accessToken")) {
        window.location.href = "/";
      } else {
        console.error("Session token was not set properly.");
      }
    } else {
      // 認証失敗
      console.error("SignIn session or AccessToken is undefined.");
    }
  } catch (error) {
    // 認証失敗
    alert(`Sign in failed: ${error}`);
  }
};

</script>


<style scoped>

</style>