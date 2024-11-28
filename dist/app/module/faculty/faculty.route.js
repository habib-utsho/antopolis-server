"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyRouter = void 0;
const express_1 = require("express");
const faculty_controller_1 = require("./faculty.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
exports.facultyRouter = router;
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), faculty_controller_1.facultyControllers.getAllFaculty);
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), faculty_controller_1.facultyControllers.getFacultyById);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), faculty_controller_1.facultyControllers.deleteFacultyById);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), faculty_controller_1.facultyControllers.updateFacultyById);
