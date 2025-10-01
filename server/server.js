import './config/dotenv.js'   // ensures .env is loaded
import express from 'express'
import HealthHacks from './controllers/healthHacks.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('Health Hacks API is running'))

// --- Separate endpoints (no Router mount) ---
app.get('/api/health-hacks',        HealthHacks.getHealthHacks)
app.get('/api/health-hacks/:id',    HealthHacks.getHealthHackById)
app.post('/api/health-hacks',       HealthHacks.createHealthHack)
app.put('/api/health-hacks/:id',    HealthHacks.updateHealthHack)
app.delete('/api/health-hacks/:id', HealthHacks.deleteHealthHack)
// --------------------------------------------

app.use((req, res) => res.status(404).json({ error: 'Route not found' }))


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`))
