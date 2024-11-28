"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validate_1 = require("./academicFaculty.validate");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
exports.academicFacultyRouter = router;
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, zodValidateHandler_1.default)(academicFaculty_validate_1.createAcademicFacultyZodSchema), academicFaculty_controller_1.academicFacultyController.insertAcademicFaculty);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.STUDENT, user_constant_1.USER_ROLE.FACULTY), academicFaculty_controller_1.academicFacultyController.getAllAcademicFaculties);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.STUDENT, user_constant_1.USER_ROLE.FACULTY), academicFaculty_controller_1.academicFacultyController.getAcademicFacultyById);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), academicFaculty_controller_1.academicFacultyController.deleteAcademicFacultyById);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, zodValidateHandler_1.default)(academicFaculty_validate_1.updateAcademicFacultyZodSchema), academicFaculty_controller_1.academicFacultyController.updateAcademicFacultyById);
