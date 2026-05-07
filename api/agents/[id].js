import { ObjectId } from 'mongodb'
import { getDb } from '../lib/mongodb.js'
import { requireAuth } from '../lib/auth.js'

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return

  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { id } = req.query
  try {
    const db = await getDb()
    const result = await db.collection('agents').deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Agent not found' })
    }
    return res.json({ success: true })
  } catch {
    return res.status(400).json({ error: 'Invalid agent ID' })
  }
}
