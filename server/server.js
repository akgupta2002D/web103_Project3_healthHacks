// server/server.js
import './config/dotenv.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import healthHacksRouter from './routes/healthHacks.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
app.use(express.json())

// Root-static: serve everything from ./public at the root path (/)
const PUBLIC_DIR = path.resolve(__dirname, './public')
app.use(express.static(PUBLIC_DIR, { extensions: ['html'] }))

// Root route -> index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'))
})

// Optional pretty route for detail page
app.get('/hack', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'hack.html'))
})

// API
app.use('/api/health-hacks', healthHacksRouter)

// Non-API 404 -> friendly page
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next()
  res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'))
})

// API 404 JSON
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Route not found' })
  }
  res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`))
