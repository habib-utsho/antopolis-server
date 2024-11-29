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
const uploadImgToCloudinary_1 = require("../../utils/uploadImgToCloudinary");
const router = (0, express_1.Router)();
exports.animalRouter = router;
// Route to insert a new animal
router.post('/', uploadImgToCloudinary_1.upload.single('file'), (req, res, next) => {
    var _a;
    req.body = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
    next();
}, (0, zodValidateHandler_1.default)(animal_validate_1.createAnimalZodSchema), animal_controller_1.animalController.insertAnimal);
// Route to retrieve all animals with optional query parameters
router.get('/', animal_controller_1.animalController.getAllAnimals);
// Route to retrieve a single animal by ID
router.get('/:id', animal_controller_1.animalController.getAnimalById);
