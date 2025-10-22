"use client"

import styles from "./stat-card.module.css"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  change: string
  positive: boolean
}

export default function StatCard({ icon: Icon, label, value, change, positive }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <Icon size={24} />
        </div>
        <span className={`${styles.change} ${positive ? styles.positive : styles.negative}`}>{change}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.value}>{value}</h3>
      </div>
    </div>
  )
}
