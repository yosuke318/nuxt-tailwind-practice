<script setup>
import {ref} from 'vue';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const email = ref("");
const password = ref("");
const newPassword = ref("");
const showNewPasswordInput= ref(false);
const buttonLabel = ref("Login");

const nuxtApp = useNuxtApp();
const userPool = nuxtApp.$userPool;
const cognitoUser = userPool.getCurrentUser();

</script>