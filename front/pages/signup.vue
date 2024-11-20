<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {CognitoUserAttribute} from "amazon-cognito-identity-js"

const nuxtApp = useNuxtApp();
const userPool = nuxtApp.$userPool;

const email = ref("");
const password = ref("");
const router = useRouter();



</script>

<template>

</template>

