<template>
  <!--全体-->
  <div class="h-screen bg-[#f8f8f9] flex justify-center items-center">

    <!--コンテナ-->
    <div class="w-[400px] py-6 bg-white rounded-lg flex-col justify-start items-start gap-6 inline-flex">

      <!--アイコンと文字-->
      <div class="self-stretch h-[34.29px] px-6 flex-col justify-start items-center gap-1.5 flex">
        <div class="justify-start items-end gap-6 inline-flex">
          <img class="w-[120px] h-[34.29px]" src="https://via.placeholder.com/120x34" alt="reset email">
          <div class="text-[#727785] text-sm font-bold font-['Inter'] leading-tight tracking-wide">
            For Example
          </div>
        </div>
      </div>

      <!--ボーダー-->
      <div class="self-stretch h-px flex-col justify-center items-start flex">
        <div class="self-stretch h-[0px] border border-[#e1e2ec]"></div>
      </div>

      <!--メールアドレス入力部分と再設定メール送信ボタンの親要素-->
      <div class="self-stretch h-[135px] px-6 flex-col justify-start items-center gap-6 flex">

        <!--メールアドレス入力部分-->
        <div class="self-stretch h-[69px] flex-col justify-start items-start gap-2 flex">
          <div class="self-stretch justify-start items-center gap-2 inline-flex">
            <div class="text-[#424753] text-xs font-medium font-['Inter'] leading-none tracking-wide">
              メールアドレス
            </div>
          </div>

          <div class="self-stretch h-[45px] px-3 py-2.5
                        bg-white rounded border border-[#c2c6d6]
                        justify-center gap-2 inline-flex input-container">
            <input type="text"
                   class="w-full focus:outline-none"
            >
          </div>
        </div>


        <!--再設定メール送信ボタン-->
        <div class="self-stretch h-[42px] bg-[#2271e3] rounded-lg justify-center items-center inline-flex">
          <button class="grow shrink basis-0 h-10 px-4 py-3 justify-center items-center gap-2.5 flex
            text-right text-white text-xs font-bold
            rounded-lg hover:bg-[#357CE5] active:bg-[#4588E7] bg-[#2271e3]">
            再設定メールを送信
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>