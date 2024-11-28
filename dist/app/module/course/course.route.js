"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const course_validate_1 = require("./course.validate");
const course_controller_1 = require("./course.controller");
const router = (0, express_1.Router)();
exports.courseRouter = router;
router.post('/', (0, zodValidateHandler_1.default)(course_validate_1.createCourseZodSchema), course_controller_1.courseController.insertCourse);
router.put('/:courseId/assign-faculties'); //TODO: Implement this route
router.get('/', course_controller_1.courseController.getAllCourse);
router.get('/:id', course_controller_1.courseController.getSingleCourseById);
router.delete('/:id', course_controller_1.courseController.deleteCourseById);
router.patch('/:id', (0, zodValidateHandler_1.default)(course_validate_1.updateCourseZodSchema), course_controller_1.courseController.updateCourseById);
