"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const category_validate_1 = require("./category.validate");
const router = (0, express_1.Router)();
exports.categoryRouter = router;
// Route to insert a new category
router.post('/', (0, zodValidateHandler_1.default)(category_validate_1.createCategoryZodSchema), // Validates the request body using Zod schema
category_controller_1.categoryController.insertCategory);
// Route to retrieve all categories with optional query parameters
router.get('/', category_controller_1.categoryController.getAllCategories);
// Route to retrieve a single category by ID
router.get('/:id', category_controller_1.categoryController.getCategoryById);
