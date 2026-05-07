import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SvatantrLogo from '../components/SvatantrLogo'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function setField(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.username.trim() || !form.password.trim()) {
      setError('Both fields are required.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed.')
        return
      }
      localStorage.setItem('admin_token', data.token)
      navigate('/manage-agents')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper">
      <header className="header">
        <Link to="/" className="header-logo">
          <SvatantrLogo size={38} />
        </Link>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <div className="card auth-card">
          <div className="auth-icon">🔐</div>
          <h1 className="agent-heading">Admin Login</h1>
          <p className="agent-subheading">Sign in to manage agent credentials.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="Enter username"
                value={form.username}
                onChange={e => setField('username', e.target.value)}
                disabled={loading}
                autoFocus
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input password-input"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={e => setField('password', e.target.value)}
                  disabled={loading}
                  autoComplete="current-password"
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

            {error && <p className="error-msg form-feedback">{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/admin/signup" className="auth-link">Sign up</Link>
          </p>
        </div>
      </main>

      <footer className="footer">
        Powered By @ <span>Svatantr</span>
      </footer>
    </div>
  )
}
