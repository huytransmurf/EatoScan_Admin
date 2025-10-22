"use client"

import { useState } from "react"
import Sidebar from "./sidebar"
import Header from "./header"
import DashboardContent from "./dashboard-content"
import styles from "./admin-dashboard.module.css"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={styles.container}>
      <Sidebar isOpen={sidebarOpen} />
      <div className={styles.mainContent}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <DashboardContent />
      </div>
    </div>
  )
}
