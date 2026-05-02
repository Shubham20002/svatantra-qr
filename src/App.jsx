import { Routes, Route, Navigate } from 'react-router-dom'
import QRCodePage from './pages/QRCodePage'
import AgentCodePage from './pages/AgentCodePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<QRCodePage />} />
      <Route path="/enter-agent" element={<AgentCodePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
