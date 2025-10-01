// config/reset.js
import { pool } from './database.js'
import './dotenv.js'

// Sample data (replace or expand later)
const hackData = [
  {
    name: "Morning Cold Shower",
    category: "Energy",
    difficulty: "Easy",
    description: "Boosts alertness and circulation by shocking the body awake.",
    submittedBy: "Ankit",
    submittedOn: new Date()
  },
  {
    name: "Intermittent Fasting",
    category: "Nutrition",
    difficulty: "Medium",
    description: "Improves metabolism and reduces insulin resistance.",
    submittedBy: "Sam",
    submittedOn: new Date()
  }
]

const createHealthHacksTable = async () => {
  const query = `
    DROP TABLE IF EXISTS health_hacks;

    CREATE TABLE IF NOT EXISTS health_hacks (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      difficulty VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      submittedBy VARCHAR(255) NOT NULL,
      submittedOn TIMESTAMP NOT NULL
    )
  `
  try {
    await pool.query(query)
    console.log("🎉 health_hacks table created successfully")
  } catch (err) {
    console.error("⚠️ error creating health_hacks table", err)
  }
}

const seedHealthHacksTable = async () => {
  await createHealthHacksTable()

  hackData.forEach((hack) => {
    const insertQuery = {
      text: `INSERT INTO health_hacks 
        (name, category, difficulty, description, submittedBy, submittedOn) 
        VALUES ($1, $2, $3, $4, $5, $6)`
    }
    const values = [
      hack.name,
      hack.category,
      hack.difficulty,
      hack.description,
      hack.submittedBy,
      hack.submittedOn
    ]

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting hack", err)
        return
      }
      console.log(`✅ ${hack.name} added successfully`)
    })
  })
}

seedHealthHacksTable()
