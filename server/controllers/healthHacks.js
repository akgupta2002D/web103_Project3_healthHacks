// controllers/healthHacks.js
import { pool } from '../config/database.js'

/**
 * GET /api/health-hacks
 * Return all health hacks
 */
const getHealthHacks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM health_hacks ORDER BY id ASC')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(409).json({ error: 'Failed to fetch health hacks', detail: error.message })
  }
}

/**
 * GET /api/health-hacks/:id
 * Return one health hack by id
 */
const getHealthHackById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('SELECT * FROM health_hacks WHERE id = $1', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(409).json({ error: 'Failed to fetch health hack', detail: error.message })
  }
}

/**
 * POST /api/health-hacks
 * Create a new health hack
 * Body: { name, category, difficulty, description, submittedBy, submittedOn? }
 */
const createHealthHack = async (req, res) => {
  const { name, category, difficulty, description, submittedBy, submittedOn } = req.body

  // Minimal validation
  if (!name || !category || !difficulty || !description || !submittedBy) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO health_hacks 
        (name, category, difficulty, description, submittedBy, submittedOn)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, category, difficulty, description, submittedBy, submittedOn || new Date()]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Failed to create health hack', detail: error.message })
  }
}

/**
 * PUT /api/health-hacks/:id
 * Update an existing health hack
 * Body: any subset of { name, category, difficulty, description, submittedBy, submittedOn }
 */
const updateHealthHack = async (req, res) => {
  const { id } = req.params
  const fields = ['name','category','difficulty','description','submittedBy','submittedOn']
  const updates = []
  const values = []

  fields.forEach((f, idx) => {
    if (req.body[f] !== undefined) {
      updates.push(`${f} = $${values.length + 1}`)
      values.push(req.body[f])
    }
  })

  if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' })

  try {
    const result = await pool.query(
      `UPDATE health_hacks SET ${updates.join(', ')} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Failed to update health hack', detail: error.message })
  }
}

/**
 * DELETE /api/health-hacks/:id
 * Delete a health hack by id
 */
const deleteHealthHack = async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('DELETE FROM health_hacks WHERE id = $1 RETURNING id', [id])
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete health hack', detail: error.message })
  }
}

export default {
  getHealthHacks,
  getHealthHackById,
  createHealthHack,
  updateHealthHack,
  deleteHealthHack
}
