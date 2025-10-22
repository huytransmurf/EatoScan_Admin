"use client"

import styles from "./chart-section.module.css"
import LineChart from "./charts/line-chart"
import type { User } from "@/utils/user-metrics"

interface ChartSectionProps {
  users: User[]
  metrics: {
    totalUsers: number
    activeUsers: number
    inactiveUsers: number
    growthRate: number
  }
}

export default function ChartSection({ users, metrics }: ChartSectionProps) {
  return (
    <div className={styles.chartsContainer}>
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <h3>User Growth</h3>
          <span className={styles.period}>Last 7 days</span>
        </div>
        <LineChart users={users} metrics={metrics} />
      </div>
    </div>
  )
}
