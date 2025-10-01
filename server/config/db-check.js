// config/db-check.js
import './dotenv.js' // make sure this exists and points to ../.env (see Step 2)
import pg from 'pg'

console.log('ENV seen by Node:', {
  PGHOST: process.env.PGHOST,
  PGPORT: process.env.PGPORT,
  PGUSER: process.env.PGUSER,
  PGDATABASE: process.env.PGDATABASE,
  PGPASSWORD_SET: Boolean(process.env.PGPASSWORD),
})

const pool = new pg.Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: { rejectUnauthorized: false },
})

try {
  const r = await pool.query('select version(), current_user, current_database()')
  console.log('✅ Connected.\n', r.rows[0])
} catch (e) {
  console.error('❌ Connection failed:', e.message)
} finally {
  await pool.end()
}
