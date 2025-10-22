"use client"

import styles from "./sidebar.module.css"
import { BarChart3, Users, Settings, LogOut, Home, TrendingUp } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "Users", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: TrendingUp, label: "Reports", active: false },
    { icon: Settings, label: "Settings", active: false },
  ]

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>📊</div>
        {isOpen && <span className={styles.logoText}>AdminHub</span>}
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item, index) => (
          <a key={index} href="#" className={`${styles.navItem} ${item.active ? styles.active : ""}`}>
            <item.icon size={20} />
            {isOpen && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      <div className={styles.footer}>
        <a href="#" className={styles.logoutBtn}>
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </a>
      </div>
    </aside>
  )
}
