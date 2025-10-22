"use client"

import styles from "./header.module.css"
import { Menu, Bell, User } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <h1 className={styles.title}>Dashboard</h1>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.badge}>3</span>
        </button>
        <button className={styles.iconBtn}>
          <User size={20} />
        </button>
      </div>
    </header>
  )
}
