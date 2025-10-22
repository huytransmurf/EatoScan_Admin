"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import styles from "./user-modal.module.css"
import type { User } from "@/utils/user-metrics"

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (user: Omit<User, "id">) => void
  initialData?: User
  mode: "add" | "edit"
}

export default function UserModal({ isOpen, onClose, onSubmit, initialData, mode }: UserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "active" as const,
    joinDate: new Date().toISOString().split("T")[0],
    country: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        status: initialData.status,
        joinDate: initialData.joinDate,
        country: initialData.country,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
        country: "",
      })
    }
    setErrors({})
  }, [isOpen, initialData, mode])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.joinDate) {
      newErrors.joinDate = "Join date is required"
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
      onClose()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{mode === "add" ? "Add New User" : "Edit User"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={errors.name ? styles.inputError : ""}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={errors.email ? styles.inputError : ""}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select name="status" id="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="joinDate">Join Date *</label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className={errors.joinDate ? styles.inputError : ""}
              />
              {errors.joinDate && <span className={styles.error}>{errors.joinDate}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country">Country *</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              className={errors.country ? styles.inputError : ""}
            />
            {errors.country && <span className={styles.error}>{errors.country}</span>}
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {mode === "add" ? "Add User" : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
