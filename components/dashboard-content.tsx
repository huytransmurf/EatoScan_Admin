"use client"
import { useState, useEffect } from "react"
import StatCard from "./stat-card"
import UserTable from "./user-table"
import ChartSection from "./chart-section"
import styles from "./dashboard-content.module.css"
import { Users, TrendingUp, Activity } from "lucide-react"
import { calculateUserMetrics, formatNumber, type User } from "@/utils/user-metrics"

export default function DashboardContent() {
  const [users, setUsers] = useState<User[]>([
  { id: 1, name: "nguyen thao vy", email: "thaovy.nguyen@gmail.com", status: "active", joinDate: "2025-10-23", country: "Vietnam" },
  { id: 2, name: "Sarah J.", email: "sarah.j@icloud.com", status: "active", joinDate: "2025-10-22", country: "USA" },
  { id: 3, name: "jiwoo_kim", email: "jiwoo.kim@kakao.com", status: "active", joinDate: "2025-10-21", country: "Korea" },
  { id: 4, name: "mike chen", email: "mike.chen@gmail.com", status: "active", joinDate: "2025-10-21", country: "USA" },
  { id: 5, name: "LeMinhAnh", email: "le.minhanh@outlook.com", status: "active", joinDate: "2025-10-20", country: "Vietnam" },
  { id: 6, name: "ParkM", email: "minjun.park@naver.com", status: "active", joinDate: "2025-10-20", country: "Korea" },
  { id: 7, name: "olivia.c", email: "olivia.carter@yahoo.com", status: "active", joinDate: "2025-10-19", country: "USA" },
  { id: 8, name: "HuongDang", email: "huong.dang@icloud.com", status: "inactive", joinDate: "2025-10-19", country: "Vietnam" },
  { id: 9, name: "seo yeon lee", email: "seoyeon.lee@daum.net", status: "active", joinDate: "2025-10-19", country: "Korea" },
  { id: 10, name: "david.a", email: "david.anderson@gmail.com", status: "active", joinDate: "2025-10-18", country: "USA" },
  { id: 11, name: "quynh nhu v", email: "quynhnhu.vu@outlook.com", status: "active", joinDate: "2025-10-18", country: "Vietnam" },
  { id: 12, name: "eunseo choi", email: "eunseo.choi@kakao.com", status: "inactive", joinDate: "2025-10-18", country: "Korea" },
  { id: 13, name: "jacob miller", email: "jacob.miller@hotmail.com", status: "inactive", joinDate: "2025-10-17", country: "USA" },
  { id: 14, name: "tran.linh", email: "linh.tran@yahoo.com", status: "inactive", joinDate: "2025-10-17", country: "Vietnam" },
  { id: 15, name: "jaehyun_h", email: "jaehyun.han@naver.com", status: "active", joinDate: "2025-10-17", country: "Korea" },
  { id: 16, name: "emily.rdz", email: "emily.rodriguez@outlook.com", status: "inactive", joinDate: "2025-10-16", country: "USA" },
  { id: 17, name: "hoangvu98", email: "vu.hoang@gmail.com", status: "active", joinDate: "2025-10-16", country: "Vietnam" },
  { id: 18, name: "somin y", email: "somin.yoon@kakao.com", status: "active", joinDate: "2025-10-15", country: "Korea" },
  { id: 19, name: "datbui", email: "tiendat.bui@yahoo.com", status: "active", joinDate: "2025-10-15", country: "Vietnam" },
  { id: 20, name: "JessLee", email: "jessica.lee@gmail.com", status: "active", joinDate: "2025-10-14", country: "USA" },
]);


  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    growthRate: 0,
  })

  useEffect(() => {
    const newMetrics = calculateUserMetrics(users)
    setMetrics(newMetrics)
  }, [users])

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: formatNumber(metrics.totalUsers),
      change: "+12.5%",
      positive: true,
    },
    {
      icon: Activity,
      label: "Active Users",
      value: formatNumber(metrics.activeUsers),
      change: "+8.2%",
      positive: true,
    },
    {
      icon: TrendingUp,
      label: "Growth Rate",
      value: `${metrics.growthRate}%`,
      change: "+5.1%",
      positive: true,
    },
  ]

  return (
    <main className={styles.content}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className={styles.chartsSection}>
        <ChartSection users={users} metrics={metrics} />
      </div>

      <div className={styles.tableSection}>
        <UserTable users={users} setUsers={setUsers} />
      </div>
    </main>
  )
}
