import { getDb } from '../lib/mongodb.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { agentCode } = req.query
  if (!agentCode) {
    return res.status(400).json({ error: 'agentCode query param is required' })
  }

  const db = await getDb()
  const agent = await db.collection('agents').findOne({ agentId: agentCode })
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' })
  }

  return res.json({ username: agent.username, password: agent.password })
}
