<template>
  <Bar :options="chartOptions" :data="props.chartData" />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import type { ChartData, ChartOptions } from "chart.js";


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  chartData: ChartData<"bar">;
  showLegend?: boolean;
}>();

const chartOptions = ref<ChartOptions<"bar">>({
  responsive: true,
  indexAxis: "y" as const,
  scales: {
    x: {
      stacked: true as const
    },
    y: {
      stacked: true as const
    }
  },
  plugins: {
    legend: {
      display: props.showLegend ?? true,
      position: 'bottom' as const
    },
  },

})
</script>