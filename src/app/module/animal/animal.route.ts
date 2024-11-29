import { NextFunction, Request, Response, Router } from 'express'
import { animalController } from './animal.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { createAnimalZodSchema } from './animal.validate'
import { upload } from '../../utils/uploadImgToCloudinary'

const router = Router()

// Route to insert a new animal
router.post(
  '/',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data)
    next()
  },
  zodValidateHandler(createAnimalZodSchema),
  animalController.insertAnimal,
)

// Route to retrieve all animals with optional query parameters
router.get('/', animalController.getAllAnimals)

// Route to retrieve a single animal by ID
router.get('/:id', animalController.getAnimalById)

export { router as animalRouter }
