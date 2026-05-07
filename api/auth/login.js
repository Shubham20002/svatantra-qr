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

  const db = await getDb()
  const user = await db.collection('admin_users').findOne({
    username: username.trim().toLowerCase(),
  })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const token = signToken({ id: user._id, username: user.username })
  return res.json({ token })
}
