import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { animalServices } from './animal.service'
import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'

// Insert a new animal
const insertAnimal: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body
  const file = req.file
  const animal = await animalServices.insertAnimal(req.file, payload)

  sendResponse(res, StatusCodes.CREATED, {
    success: true,
    message: 'Animal inserted successfully!',
    data: animal,
  })
})

// Get all animals with optional filters, pagination, and sorting
const getAllAnimals: RequestHandler = catchAsync(async (req, res) => {
  const { data, total } = await animalServices.getAllAnimals(req.query)

  const page = req.query?.page ? Number(req.query.page) : 1
  const limit = req.query?.limit ? Number(req.query.limit) : 10
  const totalPage = Math.ceil(total / limit)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Animals retrieved successfully!',
    data,
    meta: { total, page, totalPage, limit },
  })
})

// Get a single animal by ID
const getAnimalById: RequestHandler = catchAsync(async (req, res) => {
  const animal = await animalServices.getSingleAnimalById(req.params?.id)
  if (!animal) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Animal not found!')
  }

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Animal retrieved successfully!',
    data: animal,
  })
})

// Export the animal controller
export const animalController = {
  insertAnimal,
  getAllAnimals,
  getAnimalById,
}
