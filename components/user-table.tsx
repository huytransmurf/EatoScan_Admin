"use client"

import { useState } from "react"
import styles from "./user-table.module.css"
import { Trash2, Edit2, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import UserModal from "./user-modal"
import UserDetailModal from "./user-detail-modal"
import DeleteConfirmationModal from "./delete-confirmation-modal"
import type { User } from "@/utils/user-metrics"

interface UserTableProps {
  users: User[]
  setUsers: (users: User[]) => void
}

export default function UserTable({ users, setUsers }: UserTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const itemsPerPage = 5
  const totalPages = Math.ceil(users.length / itemsPerPage)
  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAddUser = (newUserData: Omit<User, "id">) => {
    const newUser: User = {
      ...newUserData,
      id: Math.max(...users.map((u) => u.id), 0) + 1,
    }
    setUsers([...users, newUser])
    setCurrentPage(1)
  }

  const handleEditUser = (updatedUserData: Omit<User, "id">) => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, ...updatedUserData } : u)))
      setSelectedUser(null)
    }
  }

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id))
      setUserToDelete(null)
      if (paginatedUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const openDetailModal = (user: User) => {
    setSelectedUser(user)
    setIsDetailModalOpen(true)
  }

  const openDeleteConfirmation = (user: User) => {
    setUserToDelete(user)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h3>User Management</h3>
        <button className={styles.addBtn} onClick={() => setIsAddModalOpen(true)}>
          + Add User
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td className={styles.nameCell}>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`${styles.badge} ${user.status === "active" ? styles.active : styles.inactive}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>{user.country}</td>
                <td className={styles.actions}>
                  <button className={styles.actionBtn} onClick={() => openDetailModal(user)} title="View Details">
                    <Eye size={16} />
                  </button>
                  <button className={styles.actionBtn} onClick={() => openEditModal(user)} title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.delete}`}
                    onClick={() => openDeleteConfirmation(user)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
        </button>

        <div className={styles.pageInfo}>
          Page {currentPage} of {totalPages} (Total: {users.length} users)
        </div>

        <button
          className={styles.pageBtn}
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <UserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddUser} mode="add" />

      <UserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUser(null)
        }}
        onSubmit={handleEditUser}
        initialData={selectedUser || undefined}
        mode="edit"
      />

      <UserDetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} user={selectedUser} />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        userName={userToDelete?.name || ""}
      />
    </div>
  )
}
