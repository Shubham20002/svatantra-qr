import express from 'express'
import agentsHandler from './api/agents/index.js'
import lookupHandler from './api/agents/lookup.js'
import deleteHandler from './api/agents/[id].js'
import loginHandler from './api/login.js'
import authLoginHandler from './api/auth/login.js'
import authSignupHandler from './api/auth/signup.js'

const app = express()
app.use(express.json())

app.post('/api/auth/login',  (req, res) => authLoginHandler(req, res))
app.post('/api/auth/signup', (req, res) => authSignupHandler(req, res))

app.get('/api/agents/lookup', (req, res) => lookupHandler(req, res))
app.get('/api/agents',        (req, res) => agentsHandler(req, res))
app.post('/api/agents',       (req, res) => agentsHandler(req, res))
app.delete('/api/agents/:id', (req, res) => {
  req.query.id = req.params.id
  deleteHandler(req, res)
})
app.post('/api/login', (req, res) => loginHandler(req, res))

app.listen(3000, () => console.log('API server → http://localhost:3000'))
