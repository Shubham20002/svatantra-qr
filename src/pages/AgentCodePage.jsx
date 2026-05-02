import { useState } from 'react'
import { Link } from 'react-router-dom'
import SvatantrLogo from '../components/SvatantrLogo'

// TODO (Future): Replace with real API call
// GET /get-ref-code?agentCode=<AGENT_CODE>
// Returns: { refCode: "<hex_string>" }
// Then use refCode to build the redirect URL below.
async function fetchRefCode(agentCode) {
  // Hardcoded until API is wired up
  void agentCode
  return '6936f35507478040c60f4ac3'
}

const REDIRECT_BASE = 'https://app.svatantr.in/#/external/apply'

export default function AgentCodePage() {
  const [agentCode, setAgentCode] = useState('')
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)
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
      const refCode = await fetchRefCode(agentCode.trim())
      // Construct the redirect URL and navigate the user
      const redirectUrl = `${REDIRECT_BASE}?ref=${encodeURIComponent(refCode)}`
      window.location.href = redirectUrl
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
                onChange={(e) => {
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

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading && <span className="spinner" />}
              {loading ? 'Redirecting…' : 'Submit'}
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
