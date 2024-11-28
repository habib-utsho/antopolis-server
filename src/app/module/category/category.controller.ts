import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoryServices } from './category.service';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';

// Insert a new category
const insertCategory: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body as { name: string }; // Expecting only `name` in the request body
  const category = await categoryServices.insertCategory(payload);

  sendResponse(res, StatusCodes.CREATED, {
    success: true,
    message: 'Category inserted successfully!',
    data: category,
  });
});

// Get all categories with optional filters, pagination, and sorting
const getAllCategories: RequestHandler = catchAsync(async (req, res) => {
  const { data, total } = await categoryServices.getAllCategories(req.query);

  const page = req.query?.page ? Number(req.query.page) : 1;
  const limit = req.query?.limit ? Number(req.query.limit) : 10;
  const totalPage = Math.ceil(total / limit);

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Categories retrieved successfully!',
    data,
    meta: { total, page, totalPage, limit },
  });
});

// Get a single category by ID
const getCategoryById: RequestHandler = catchAsync(async (req, res) => {
  const category = await categoryServices.getSingleCategoryById(req.params?.id);
  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found!');
  }

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Category retrieved successfully!',
    data: category,
  });
});

// Export the category controller
export const categoryController = {
  insertCategory,
  getAllCategories,
  getCategoryById,
};
