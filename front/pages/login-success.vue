<template>
  <div>
    <h1>login success!!</h1>
    <button @click="logout">logout</button>
    <button @click="checkSession">Check your Session</button>
  </div>
</template>

<script setup>


definePageMeta({
  middleware: ['auth']
})

const nuxtApp = useNuxtApp();
const userPool = nuxtApp.$userPool;

/**
 * ログアウト処理
 */
const logout = async () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.signOut();
  }
  window.location.href = "/"
};

/**
 * セッション確認
 */
const checkSession = () => {
  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.error("Error retrieving session", err);
        return;
      }

      if (session.isValid()) {
        const payload = JSON.parse(atob(session.getIdToken().jwtToken.split('.')[1]));
        console.log('ID token paylowad:', payload);

        const expirationTime = new Date(session.getIdToken().getExpiration() * 1000);
        const currentTime = new Date();
        const timeLeft = expirationTime - currentTime;
        const minutesLeft = Math.floor(timeLeft / (1000 * 60));
        console.log(`Session is valid. It will expire in ${minutesLeft} minutes.`);
        console.log("有効きげん：", expirationTime)
        console.log("現在時刻", currentTime)
      } else {
        console.log('Session is not valid.');
      }
    });
  } else {
    console.log("User doesn't have a valid session");
  }
}
</script>