import { z } from 'zod'

const createAnimalZodSchema = z.object({
  name: z.string({
    invalid_type_error: 'Please input string!',
    required_error: 'Animal name is required!',
  }),
  category: z.string({
    invalid_type_error: 'Please input a valid category ID!',
    required_error: 'Category ID is required!',
  }),
})

const updateAnimalZodSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Please input string!',
    })
    .optional(),
  category: z
    .string({
      invalid_type_error: 'Please input a valid category ID!',
    })
    .optional(),
})

export { createAnimalZodSchema, updateAnimalZodSchema }
