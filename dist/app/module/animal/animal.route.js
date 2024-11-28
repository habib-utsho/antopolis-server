"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalRouter = void 0;
const express_1 = require("express");
const animal_controller_1 = require("./animal.controller");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const animal_validate_1 = require("./animal.validate");
const router = (0, express_1.Router)();
exports.animalRouter = router;
// Route to insert a new animal
router.post('/', (0, zodValidateHandler_1.default)(animal_validate_1.createAnimalZodSchema), // Validates the request body using Zod schema
animal_controller_1.animalController.insertAnimal);
// Route to retrieve all animals with optional query parameters
router.get('/', animal_controller_1.animalController.getAllAnimals);
// Route to retrieve a single animal by ID
router.get('/:id', animal_controller_1.animalController.getAnimalById);
