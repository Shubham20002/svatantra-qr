import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SvatantrLogo from '../components/SvatantrLogo'
import { getAuthHeader } from '../components/ProtectedRoute'

export default function ManageAgentlist() {
  const navigate = useNavigate()
  const [agents, setAgents] = useState([])
  const [listLoading, setListLoading] = useState(true)
  const [listError, setListError] = useState('')

  const [form, setForm] = useState({ agentId: '', username: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  const [deletingId, setDeletingId] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => { loadAgents() }, [])

  async function loadAgents() {
    setListLoading(true)
    setListError('')
    try {
      const res = await fetch('/api/agents', { headers: getAuthHeader() })
      if (res.status === 401) { navigate('/admin/login'); return }
      if (!res.ok) throw new Error()
      setAgents(await res.json())
    } catch {
      setListError('Failed to load agents.')
    } finally {
      setListLoading(false)
    }
  }

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.agentId.trim() || !form.username.trim() || !form.password.trim()) {
      setFormError('All fields are required.')
      return
    }
    setSubmitting(true)
    setFormError('')
    setFormSuccess('')
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setFormError(data.error || 'Failed to add agent.')
        return
      }
      setForm({ agentId: '', username: '', password: '' })
      setFormSuccess('Agent added successfully.')
      await loadAgents()
    } catch {
      setFormError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    setConfirmDeleteId(null)
    setDeletingId(id)
    try {
      const res = await fetch(`/api/agents/${id}`, { method: 'DELETE', headers: getAuthHeader() })
      if (!res.ok) {
        setListError('Failed to delete agent. Please try again.')
        return
      }
      setAgents(prev => prev.filter(a => String(a._id) !== String(id)))
    } catch {
      setListError('Failed to delete agent. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  function setField(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    setFormError('')
    setFormSuccess('')
  }

  return (
    <div className="page-wrapper">
      <header className="header" style={{ justifyContent: 'space-between', padding: '14px 24px' }}>
        <Link to="/" className="header-logo">
          <SvatantrLogo size={38} />
        </Link>
        <button
          className="btn-logout"
          onClick={() => { localStorage.removeItem('admin_token'); navigate('/admin/login') }}
        >
          Logout
        </button>
      </header>

      <main className="manage-main">
        {/* ── Add Agent Form ── */}
        {/* <div className="card manage-card">
          <h1 className="agent-heading">Manage Agents</h1>
          <p className="agent-subheading">
            Add agent credentials. When an agent enters their code, these credentials
            are used to authenticate and retrieve their reference ID.
          </p>

          <form onSubmit={handleAdd} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="agentId">Agent ID</label>
              <input
                id="agentId"
                type="text"
                className="form-input"
                placeholder="e.g. 000001"
                value={form.agentId}
                onChange={e => setField('agentId', e.target.value)}
                disabled={submitting}
                autoComplete="off"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="username">Username / Email</label>
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="e.g. agent@example.com"
                value={form.username}
                onChange={e => setField('username', e.target.value)}
                disabled={submitting}
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input password-input"
                  placeholder="Password"
                  value={form.password}
                  onChange={e => setField('password', e.target.value)}
                  disabled={submitting}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {formError && <p className="error-msg form-feedback">{formError}</p>}
            {formSuccess && <p className="success-msg form-feedback">{formSuccess}</p>}

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting && <span className="spinner" />}
              {submitting ? 'Adding…' : 'Add Agent'}
            </button>
          </form>
        </div> */}

        {/* ── Agents List ── */}
        <div className="card manage-card">
          <h2 className="section-heading">Saved Agents</h2>

          {listLoading ? (
            <div className="list-center">
              <span className="spinner spinner-dark" />
            </div>
          ) : listError ? (
            <p className="error-msg">{listError}</p>
          ) : agents.length === 0 ? (
            <p className="empty-msg">No agents added yet.</p>
          ) : (
            <ul className="agents-list">
              {agents.map(agent => (
                <li key={String(agent._id)} className="agent-item">
                  <div className="agent-item-info">
                    <span className="agent-item-id">{agent.agentId}</span>
                    <span className="agent-item-username">{agent.username}</span>
                  </div>
                  {confirmDeleteId === String(agent._id) ? (
                    <div className="confirm-delete">
                      <span className="confirm-delete-text">Delete?</span>
                      <button
                        className="btn-danger btn-sm"
                        onClick={() => handleDelete(String(agent._id))}
                        disabled={deletingId === String(agent._id)}
                      >
                        {deletingId === String(agent._id) ? '…' : 'Yes'}
                      </button>
                      <button
                        className="btn-secondary btn-sm"
                        onClick={() => setConfirmDeleteId(null)}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn-danger"
                      onClick={() => setConfirmDeleteId(String(agent._id))}
                      disabled={deletingId === String(agent._id)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <footer className="footer">
        Powered By @ <span>Svatantr</span>
      </footer>
    </div>
  )
}
