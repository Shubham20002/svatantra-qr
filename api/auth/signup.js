import bcrypt from 'bcryptjs'
import { getDb } from '../lib/mongodb.js'
import { signToken } from '../lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { username, password } = req.body ?? {}
  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({ error: 'Username and password are required' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }

  const db = await getDb()
  const col = db.collection('admin_users')

  const existing = await col.findOne({ username: username.trim().toLowerCase() })
  if (existing) {
    return res.status(409).json({ error: 'Username already exists' })
  }

  const hashed = await bcrypt.hash(password, 10)
  const result = await col.insertOne({
    username: username.trim().toLowerCase(),
    password: hashed,
    createdAt: new Date(),
  })

  const token = signToken({ id: result.insertedId, username: username.trim().toLowerCase() })
  return res.status(201).json({ token })
}
