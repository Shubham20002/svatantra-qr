import { getDb } from '../lib/mongodb.js'
import { requireAuth } from '../lib/auth.js'

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return

  const db = await getDb()
  const col = db.collection('agents')

  if (req.method === 'GET') {
    const agents = await col
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray()
    return res.json(agents)
  }

  if (req.method === 'POST') {
    const { agentId, username, password } = req.body ?? {}
    if (!agentId?.trim() || !username?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'agentId, username, and password are required' })
    }
    const existing = await col.findOne({ agentId: agentId.trim() })
    if (existing) {
      return res.status(409).json({ error: 'Agent ID already exists' })
    }
    const result = await col.insertOne({
      agentId: agentId.trim(),
      username: username.trim(),
      password: password.trim(),
      createdAt: new Date(),
    })
    return res.status(201).json({ id: result.insertedId })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
