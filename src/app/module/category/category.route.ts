import { Router } from 'express'
import { categoryController } from './category.controller'
import zodValidateHandler from '../../middleware/zodValidateHandler'
import { createCategoryZodSchema } from './category.validate'

const router = Router()

// Route to insert a new category
router.post(
  '/',
  zodValidateHandler(createCategoryZodSchema), // Validates the request body using Zod schema
  categoryController.insertCategory,
)

// Route to retrieve all categories with optional query parameters
router.get('/', categoryController.getAllCategories)

// Route to retrieve a single category by ID
router.get('/:id', categoryController.getCategoryById)

export { router as categoryRouter }
