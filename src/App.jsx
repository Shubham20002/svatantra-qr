import { Routes, Route, Navigate } from 'react-router-dom'
import QRCodePage from './pages/QRCodePage'
import AgentCodePage from './pages/AgentCodePage'
import ManageAgentlist from './pages/ManageAgentlist'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminSignupPage from './pages/AdminSignupPage'
import ProtectedRoute from './components/ProtectedRoute'
import Agentform from './pages/Agentform'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<QRCodePage />} />
      <Route path="/enter-agent" element={<AgentCodePage />} />

      <Route path="/admin/login" element={<AdminLoginPage />} />
      {/* <Route path="/admin/signup" element={<AdminSignupPage />} /> */}
      <Route path="/add/agents" element={<Agentform />} />

      <Route
        path="/manage-agents"
        element={
          <ProtectedRoute>
            <ManageAgentlist />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
