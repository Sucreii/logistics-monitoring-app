<script lang="ts" setup>
import { ref } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels,
)

const chartData = ref({
  labels: ['Week 1 ', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [
    {
      label: 'Pending',
      data: [25, 35, 10, 30, 10, 34],
      borderColor: '#36A2EB',
      backgroundColor: '#36A2EB',
      tension: 0.3,
      fill: false,
    },
    {
      label: 'Delivered',
      data: [15, 25, 30, 10, 34, 80],
      borderColor: '#BC9C6D',
      backgroundColor: '#BC9C6D',
      tension: 0.3,
      fill: false,
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
    },
    datalabels: {
      display: true,
      align: 'top' as const,
      color: '#444',
      font: {
        weight: 'bold' as const,
      },
      formatter: (value: number) => `${value}%`,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: string | number) => `${value}%`,
      },
    },
  },
})
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>