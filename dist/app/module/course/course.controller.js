"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const course_service_1 = require("./course.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const insertCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_service_1.courseServices.insertCourseToDb(req.body);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Courses created successfully!',
        data: course,
    });
}));
const getAllCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_service_1.courseServices.getAllCourse(req.query);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Courses retrieved successfully!',
        data: course,
    });
}));
const getSingleCourseById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const course = yield course_service_1.courseServices.getSingleCourseById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!course) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Course not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Course is retrieved successfully!',
        data: course,
    });
}));
const deleteCourseById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const course = yield course_service_1.courseServices.deleteCourseById((_b = req.params) === null || _b === void 0 ? void 0 : _b.id);
    if (!course) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Course not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Course is deleted successfully!',
        data: course,
    });
}));
const updateCourseById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const course = yield course_service_1.courseServices.updateCourseById((_c = req.params) === null || _c === void 0 ? void 0 : _c.id, req.body);
    if (!course) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Course not updated!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Course updated successfully!',
        data: course,
    });
}));
exports.courseController = {
    insertCourse,
    getAllCourse,
    getSingleCourseById,
    deleteCourseById,
    updateCourseById,
};
