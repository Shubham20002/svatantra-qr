import { useState } from 'react'
import { Link } from 'react-router-dom'
import SvatantrLogo from '../components/SvatantrLogo'

const REDIRECT_BASE = 'https://app.svatantr.in/#/external/apply'

export default function AgentCodePage() {
  const [agentCode, setAgentCode] = useState('')
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [apiError, setApiError] = useState('')

  const isEmpty = agentCode.trim() === ''
  const showError = touched && isEmpty

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (isEmpty) return

    setLoading(true)
    setApiError('')

    try {
      // Step 1: look up credentials stored for this agent code
      setLoadingMsg('Looking up agent…')
      const lookupRes = await fetch(
        `/api/agents/lookup?agentCode=${encodeURIComponent(agentCode.trim())}`
      )
      if (lookupRes.status === 404) {
        setApiError('Agent code not found. Please check and try again.')
        setLoading(false)
        return
      }
      if (!lookupRes.ok) throw new Error('lookup failed')
      const { username, password } = await lookupRes.json()

      // Step 2: authenticate with the Svatantr platform
      setLoadingMsg('Authenticating…')
      const loginRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!loginRes.ok) {
        setApiError('Agent authentication failed. Please contact support.')
        setLoading(false)
        return
      }
      const loginData = await loginRes.json()

      // Step 3: extract teleCallerId as the ref ID
      const teleCallerId = loginData?.user?.teleCallerId
      if (!teleCallerId) {
        setApiError('Could not retrieve agent reference ID. Please contact support.')
        setLoading(false)
        return
      }

      // Step 4: redirect
      setLoadingMsg('Redirecting…')
      window.location.href = `${REDIRECT_BASE}?ref=${encodeURIComponent(teleCallerId)}`
    } catch {
      setApiError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper">
      <header className="header">
        <Link to="/" className="header-logo">
          <SvatantrLogo size={38} />
          <span className="header-brand">Svatantr</span>
        </Link>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <div className="card agent-card">
          <h1 className="agent-heading">Enter Your Agent Code</h1>
          <p className="agent-subheading">
            Enter the referral code available on the QR code you scanned to continue.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="agentCode">
                Agent Code
              </label>
              <input
                id="agentCode"
                type="text"
                className={`form-input${showError ? ' error' : ''}`}
                placeholder="e.g. 000001"
                value={agentCode}
                onChange={e => {
                  setAgentCode(e.target.value)
                  setApiError('')
                }}
                onBlur={() => setTouched(true)}
                disabled={loading}
                autoFocus
                autoComplete="off"
              />
              {showError && (
                <span className="error-msg">Please enter your agent code.</span>
              )}
              {apiError && (
                <span className="error-msg">{apiError}</span>
              )}
            </div>

            <p className="form-note">
              Note: This referral code is available on the QR code when you scan it.
            </p>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? loadingMsg : 'Submit'}
            </button>
          </form>
        </div>
      </main>

      <footer className="footer">
        Powered By @ <span>Svatantr</span>
      </footer>
    </div>
  )
}
