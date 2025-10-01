// routes/healthHacks.js
import { Router } from 'express'
import HealthHacksController from '../controllers/healthHacks.js'

const router = Router()

router.get('/', HealthHacksController.getHealthHacks)
router.get('/:id', HealthHacksController.getHealthHackById)
router.post('/', HealthHacksController.createHealthHack)
router.put('/:id', HealthHacksController.updateHealthHack)
router.delete('/:id', HealthHacksController.deleteHealthHack)

export default router
