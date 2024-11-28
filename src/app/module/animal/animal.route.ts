import { Router } from 'express';
import { animalController } from './animal.controller';
import zodValidateHandler from '../../middleware/zodValidateHandler';
import { createAnimalZodSchema } from './animal.validate';

const router = Router();

// Route to insert a new animal
router.post(
  '/',
  zodValidateHandler(createAnimalZodSchema), // Validates the request body using Zod schema
  animalController.insertAnimal,
);

// Route to retrieve all animals with optional query parameters
router.get('/', animalController.getAllAnimals);

// Route to retrieve a single animal by ID
router.get('/:id', animalController.getAnimalById);

export { router as animalRouter };
