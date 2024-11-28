import { z } from 'zod'

const createCategoryZodSchema = z.object({
  name: z.string({
    invalid_type_error: 'Please input string!',
    required_error: 'Category name is required!',
  }),
})
const updateCategoryZodSchema = z.object({
  department: z
    .string({
      invalid_type_error: 'Please input string!',
      required_error: 'Category name is required!',
    })
    .optional(),
})

export { createCategoryZodSchema, updateCategoryZodSchema }
