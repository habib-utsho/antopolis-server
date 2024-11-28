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
exports.facultyControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const faculty_service_1 = require("./faculty.service");
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getAllFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield faculty_service_1.facultyServices.getAllFaculty(req.query);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Faculties are retrieved successfully!',
        data: faculty,
    });
}));
const getFacultyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const faculty = yield faculty_service_1.facultyServices.getSingleFacultyById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!faculty) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Faculty not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Faculty is retrieved successfully!',
        data: faculty,
    });
}));
const deleteFacultyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield faculty_service_1.facultyServices.deleteFacultyById(req.params.id);
    if (!faculty) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Faculty not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Faculty is deleted successfully!',
        data: faculty,
    });
}));
const updateFacultyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const faculty = yield faculty_service_1.facultyServices.updateFacultyById((_b = req.params) === null || _b === void 0 ? void 0 : _b.id, req.body);
    if (!faculty) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Faculty not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Faculty is updated successfully!',
        data: faculty,
    });
}));
exports.facultyControllers = {
    getAllFaculty,
    getFacultyById,
    deleteFacultyById,
    updateFacultyById,
};
