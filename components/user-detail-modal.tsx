"use client"

import { X } from "lucide-react"
import styles from "./user-detail-modal.module.css"

interface User {
  id: number
  name: string
  email: string
  status: "active" | "inactive"
  joinDate: string
  revenue: string
}

interface UserDetailModalProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

export default function UserDetailModal({ isOpen, onClose, user }: UserDetailModalProps) {
  if (!isOpen || !user) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>User Details</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.detailContent}>
          <div className={styles.detailItem}>
            <span className={styles.label}>ID</span>
            <span className={styles.value}>{user.id}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.label}>Full Name</span>
            <span className={styles.value}>{user.name}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{user.email}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.label}>Status</span>
            <span className={`${styles.value} ${styles[user.status]}`}>{user.status}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.label}>Join Date</span>
            <span className={styles.value}>{new Date(user.joinDate).toLocaleDateString()}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.label}>Revenue</span>
            <span className={styles.value}>{user.revenue}</span>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.closeActionBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
