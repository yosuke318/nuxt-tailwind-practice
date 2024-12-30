<template>
  <div class="patination">
    <button @click="prevPage" :disabled="isFirstPage()" :class="{'text-gray-500': isFirstPage()}" class="m-2">前へ</button>
    <button v-for="page in totalPages"
            :key="page"
            @click="pageChanged(page)"
            :class="{ active: page === currentPage }"
            class="m-2">
    {{ page }}
    </button>
    <button @click="nextPage" :disabled="currentPage === totalPages" :class="{'text-gray-500': isLastPage()}" class="m-2">次へ</button>
  </div>


</template>


<script setup lang="ts">

import {ref, computed } from 'vue';

const props = defineProps<{
  items: any[];
  itemNumPerPage: number;
  currentPage: number;
}>();

const isFirstPage = () => {
  console.log(props.currentPage);
  return props.currentPage === 1;
}

const isLastPage = () => {
  return props.currentPage === totalPages.value;
}

const emit = defineEmits(['update:currentPage', 'pageChanged'])
const totalPage = ref(0);


const totalPages = computed(() => {
  console.log(props.items.length);
  totalPage.value = Math.ceil(props.items.length / props.itemNumPerPage);
  return Math.ceil(props.items.length / props.itemNumPerPage);
});

const displayedItems = computed(() => {
  const start = (props.currentPage - 1) * props.itemNumPerPage;
  const end = start + props.itemNumPerPage;
  return props.items.slice(start, end);
});

const pageChanged = (page) => {
  emit('pageChanged', page);
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('pageChanged', props.currentPage - 1);
  }
};

const nextPage = () => {
  console.log("currentPage", props.currentPage);
  console.log("totalPage", totalPage.value);
  if (props.currentPage < totalPage.value) {
    emit('pageChanged', props.currentPage + 1);
  }
}

</script>