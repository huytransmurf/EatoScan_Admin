export interface User {
  id: number
  name: string
  email: string
  status: "active" | "inactive"
  joinDate: string
  country: string
}

export function calculateUserMetrics(users: User[]) {
  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length
  const inactiveUsers = totalUsers - activeUsers

  // Calculate growth rate based on active users percentage
  const growthRate = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : "0"

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
    growthRate: Number.parseFloat(growthRate),
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num)
}
