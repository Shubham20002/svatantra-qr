import { Routes, Route, Navigate } from 'react-router-dom'
import QRCodePage from './pages/QRCodePage'
import AgentCodePage from './pages/AgentCodePage'
import ManageAgentsPage from './pages/ManageAgentsPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminSignupPage from './pages/AdminSignupPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<QRCodePage />} />
      <Route path="/enter-agent" element={<AgentCodePage />} />

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/signup" element={<AdminSignupPage />} />

      <Route
        path="/manage-agents"
        element={
          <ProtectedRoute>
            <ManageAgentsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
