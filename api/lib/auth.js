import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'svatantra-admin-secret-key-2024'

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

export function requireAuth(req, res) {
  const auth = req.headers['authorization'] || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return null
  }
  try {
    return jwt.verify(token, SECRET)
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
    return null
  }
}
