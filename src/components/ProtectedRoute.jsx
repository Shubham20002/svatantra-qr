import { Navigate } from 'react-router-dom'

function isTokenValid(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('admin_token')
  if (!token || !isTokenValid(token)) {
    localStorage.removeItem('admin_token')
    return <Navigate to="/admin/login" replace />
  }
  return children
}

export function getAuthHeader() {
  const token = localStorage.getItem('admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}
