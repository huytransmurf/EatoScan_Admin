"use client"

import styles from "./line-chart.module.css"
import type { User } from "@/utils/user-metrics"

interface LineChartProps {
  users: User[]
  metrics: {
    totalUsers: number
    activeUsers: number
    inactiveUsers: number
    growthRate: number
    totalRevenue: number
  }
}

export default function LineChart({ users, metrics }: LineChartProps) {
  const generateChartData = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() - (6 - i))
      return date
    })

    const data = last7Days.map((date, index) => {
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
      const dateStr = date.toISOString().split("T")[0]

      // Count users who joined on or before this date
      const usersUpToDate = users.filter((u) => {
        const userJoinDate = new Date(u.joinDate)
        userJoinDate.setHours(0, 0, 0, 0)
        return userJoinDate <= date
      }).length

      return {
        day: dayName,
        date: dateStr,
        value: usersUpToDate,
      }
    })

    return data
  }

  const data = generateChartData()
  const maxValue = Math.max(...data.map((d) => d.value), 1)
  const minValue = Math.min(...data.map((d) => d.value), 0)
  const range = maxValue - minValue || 1

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
            {Math.round(maxValue - (i * range) / 4)}
          </text>
        ))}

        {/* Line path */}
        <polyline
          points={data
            .map((d, i) => {
              const x = 80 + (i * 600) / (data.length - 1)
              const y = 250 - ((d.value - minValue) / range) * 200
              return `${x},${y}`
            })
            .join(" ")}
          fill="none"
          stroke="#ff8c42"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((d, i) => {
          const x = 80 + (i * 600) / (data.length - 1)
          const y = 250 - ((d.value - minValue) / range) * 200
          return <circle key={`point-${i}`} cx={x} cy={y} r="5" fill="#ff8c42" stroke="#ffffff" strokeWidth="2" />
        })}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={`x-label-${i}`}
            x={80 + (i * 600) / (data.length - 1)}
            y="280"
            textAnchor="middle"
            fontSize="12"
            fill="#94a3b8"
          >
            {d.day}
          </text>
        ))}
      </svg>
    </div>
  )
}
