<template>
  <Bar :options="chartOptions" :data="props.chartData" />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import type { ChartData } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  chartData: ChartData<"bar">;
  showLegend?: boolean;
}>();

const chartOptions = ref({
  responsive: true,
  indexAxis: 'y',
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  },
  plugins: {
    legend: {
      display: props.showLegend ?? true,
      position: 'bottom',
      labels: {
        color: 'rgb(0, 0, 0)',
        font: {
          size: 20
        }
      }
    },
  },

})
</script>