import express from 'express'
import './config/dotenv.js'   // ensures .env is loaded
import healthHacksRouter from './routes/healthHacks.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('Health Hacks API is running'))

app.use('/api/healthHacks', healthHacksRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`))
