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
    // 🇰🇷 Korea
    { id: 1, name: "Park Min-jun", email: "minjun.park@naver.com", status: "active", joinDate: "2025-10-23", country: "Korea" },
    { id: 2, name: "Kim Ji-woo", email: "jiwoo.kim@gmail.com", status: "active", joinDate: "2025-10-22", country: "Korea" },
    { id: 3, name: "Lee Seo-yeon", email: "seoyeon.lee@daum.net", status: "active", joinDate: "2025-10-21", country: "Korea" },
    { id: 4, name: "Choi Eun-seo", email: "eunseo.choi@kakao.com", status: "inactive", joinDate: "2025-10-20", country: "Korea" },
    { id: 5, name: "Han Jae-hyun", email: "jaehyun.han@naver.com", status: "active", joinDate: "2025-10-19", country: "Korea" },
    { id: 6, name: "Yoon So-min", email: "somin.yoon@kakao.com", status: "active", joinDate: "2025-10-18", country: "Korea" },

    // 🇺🇸 USA
    { id: 7, name: "Sarah Johnson", email: "sarah.johnson@yahoo.com", status: "active", joinDate: "2025-10-23", country: "USA" },
    { id: 8, name: "Michael Chen", email: "michael.chen@gmail.com", status: "active", joinDate: "2025-10-22", country: "USA" },
    { id: 9, name: "Emily Rodriguez", email: "emily.rodriguez@outlook.com", status: "inactive", joinDate: "2025-10-21", country: "USA" },
    { id: 10, name: "David Anderson", email: "david.anderson@gmail.com", status: "active", joinDate: "2025-10-20", country: "USA" },
    { id: 11, name: "Olivia Carter", email: "olivia.carter@icloud.com", status: "active", joinDate: "2025-10-19", country: "USA" },
    { id: 12, name: "Jacob Miller", email: "jacob.miller@hotmail.com", status: "inactive", joinDate: "2025-10-18", country: "USA" },

    // 🇻🇳 Vietnam
    { id: 13, name: "Nguyễn Tuấn", email: "tuan.nguyen@gmail.com", status: "active", joinDate: "2025-10-23", country: "Vietnam" },
    { id: 14, name: "Trần Linh", email: "linh.tran@yahoo.com", status: "inactive", joinDate: "2025-10-22", country: "Vietnam" },
    { id: 15, name: "Lê Minh Anh", email: "minhanh.le@outlook.com", status: "active", joinDate: "2025-10-21", country: "Vietnam" },
    { id: 16, name: "Phạm Gia Bảo", email: "giabao.pham@gmail.com", status: "active", joinDate: "2025-10-20", country: "Vietnam" },
    { id: 17, name: "Đặng Thị Hương", email: "huong.dang@icloud.com", status: "inactive", joinDate: "2025-10-19", country: "Vietnam" },
    { id: 18, name: "Hoàng Vũ", email: "vu.hoang@gmail.com", status: "active", joinDate: "2025-10-18", country: "Vietnam" },
    { id: 19, name: "Vũ Quỳnh Như", email: "quynhnhu.vu@outlook.com", status: "active", joinDate: "2025-10-18", country: "Vietnam" },
    { id: 20, name: "Bùi Tiến Đạt", email: "tiendat.bui@yahoo.com", status: "active", joinDate: "2025-10-17", country: "Vietnam" },
  ])

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
