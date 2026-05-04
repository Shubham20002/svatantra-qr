import { Routes, Route, Navigate } from 'react-router-dom'
import QRCodePage from './pages/QRCodePage'
import AgentCodePage from './pages/AgentCodePage'
import ManageAgentsPage from './pages/ManageAgentsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<QRCodePage />} />
      <Route path="/enter-agent" element={<AgentCodePage />} />
      <Route path="/manage-agents" element={<ManageAgentsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
