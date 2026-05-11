import { QRCodeSVG } from 'qrcode.react'
import { Link } from 'react-router-dom'
import SvatantrLogo from '../components/SvatantrLogo'

// The QR code encodes the public URL where agents land to enter their code.
// Update BASE_URL to your deployed domain before printing/sharing.
const BASE_URL = 'https://qr.svatantr.in'
const QR_TARGET_URL = `${BASE_URL}/enter-agent`

export default function QRCodePage() {
  return (
    <div className="page-wrapper">
      <header className="header">
        <Link to="/" className="header-logo">
          <SvatantrLogo size={38} />
        </Link>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <div className="card qr-card">
          <p className="qr-title">
            <strong>Scan this QR code</strong> to visit our landing page and complete your application.
          </p>

          <div className="qr-box">
            <QRCodeSVG
              value={QR_TARGET_URL}
              size={220}
              fgColor="#1b3a28"
              bgColor="#ffffff"
              level="M"
              includeMargin={false}
            />
          </div>
{/* 
          <div>
            <span className="qr-referral-label">Referral Code : 000001</span>
          </div> */}

          <div className="qr-note">
            After scanning, you will be prompted to enter your <strong>Agent Code</strong>.
            {/* The agent code is configured in Svatantr and unique to each agent. */}
          </div>


        </div>
      </main>

      <footer className="footer">
        Powered By @ <span>Svatantr</span>
      </footer>
    </div>
  )
}
