<template>
  <div>
    <BandGraph :chartData="chartData" :showLegend=true />
  </div>
</template>

<script setup lang="ts">

import BandGraph from "~/components/BandGraph.vue";


const chartData = ref({
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '一般',
      data: [10, 10, 10, 20, 10, 10],
      fill: true,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      borderSkipped: true
    },
    {
      label: 'エース',
      data: [80, 80, 50, 70, 80, 80],
      fill: false,
      backgroundColor: 'rgb(87, 75, 192)',
      borderColor: 'rgb(87, 75, 192)',
      tension: 0.1,
      borderSkipped: true
    }
  ]
});

</script>



<style scoped>

</style>