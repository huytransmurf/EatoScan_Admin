"use client"

import styles from "./bar-chart.module.css"
import type { User } from "@/utils/user-metrics"

interface BarChartProps {
  users: User[]
}

export default function BarChart({ users }: BarChartProps) {
  const generateRevenueData = () => {
    const categories = [
      { name: "High Value", min: 4000, max: 10000 },
      { name: "Medium-High", min: 3000, max: 3999 },
      { name: "Medium", min: 2000, max: 2999 },
      { name: "Low-Medium", min: 1000, max: 1999 },
      { name: "Low Value", min: 0, max: 999 },
    ]

    return categories.map((cat) => {
      const categoryUsers = users.filter((u) => {
        const revenue = Number.parseFloat(u.revenue.replace(/[$,]/g, ""))
        return revenue >= cat.min && revenue <= cat.max
      })
      const totalRevenue = categoryUsers.reduce((sum, u) => {
        return sum + Number.parseFloat(u.revenue.replace(/[$,]/g, ""))
      }, 0)
      return { category: cat.name, value: Math.round(totalRevenue) }
    })
  }

  const data = generateRevenueData()
  const maxValue = Math.max(...data.map((d) => d.value), 1)

  const colors = ["#ff8c42", "#ff9d5c", "#ffad76", "#ffbd90", "#ffcdaa"]

  return (
    <div className={styles.chartWrapper}>
      <svg viewBox="0 0 700 300" className={styles.svg}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`grid-${i}`}
            x1="50"
            y1={50 + i * 50}
            x2="680"
            y2={50 + i * 50}
            stroke="#334155"
            strokeDasharray="5,5"
            strokeWidth="1"
          />
        ))}

        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map((i) => (
          <text key={`label-${i}`} x="40" y={60 + i * 50} textAnchor="end" fontSize="12" fill="#94a3b8">
            ${Math.round(maxValue - (i * maxValue) / 4)}
          </text>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = (d.value / maxValue) * 200
          const x = 80 + i * 120
          const y = 250 - barHeight
          return (
            <g key={`bar-${i}`}>
              <rect x={x} y={y} width="80" height={barHeight} fill={colors[i]} rx="4" className={styles.bar} />
              <text x={x + 40} y="270" textAnchor="middle" fontSize="12" fill="#94a3b8">
                {d.category}
              </text>
              <text x={x + 40} y={y - 5} textAnchor="middle" fontSize="12" fill="#ffffff" fontWeight="600">
                ${d.value}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
