import React from 'react'
import { SalaryType } from '../Utils/Types'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function Chart({ data }: { data: SalaryType[] }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Aggregate Salaries by Location',
      },
    },
  }

  const labels = data.map((item) => item.location)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Agg. Salary',
        data: data.map((item) => item.salary),
        backgroundColor: 'rgba(29, 78, 216, 0.75)',
      },
    ],
  }

  return <Bar options={options} data={chartData} />
}

export default Chart
