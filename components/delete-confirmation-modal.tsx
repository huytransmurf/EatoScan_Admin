"use client"

import { AlertCircle } from "lucide-react"
import styles from "./delete-confirmation-modal.module.css"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconContainer}>
          <AlertCircle size={48} />
        </div>

        <h2>Delete User</h2>
        <p>
          Are you sure you want to delete <strong>{userName}</strong>? This action cannot be undone.
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.deleteBtn} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
