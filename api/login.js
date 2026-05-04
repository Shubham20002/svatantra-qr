const LOGIN_URL = 'https://app.svatantr.in/api/user/login'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { username, password } = req.body ?? {}
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' })
  }

  try {
    const upstream = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailId: username, password }),
    })

    const data = await upstream.json()

    if (!upstream.ok) {
      return res.status(upstream.status).json(data)
    }

    return res.json(data)
  } catch {
    return res.status(502).json({ error: 'Login service unavailable' })
  }
}
