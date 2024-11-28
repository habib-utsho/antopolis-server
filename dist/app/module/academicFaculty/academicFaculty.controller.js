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
exports.academicFacultyController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicFaculty_service_1 = require("./academicFaculty.service");
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const insertAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFaculty = yield academicFaculty_service_1.academicFacultyServices.insertAcademicFacultyToDb(req.body);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Academic faculty inserted successfully!',
        data: academicFaculty,
    });
}));
const getAllAcademicFaculties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { data, total } = yield academicFaculty_service_1.academicFacultyServices.getAllAcademicFaculties(req.query);
    const page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) ? Number(req.query.page) : 1;
    const limit = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.limit) : 10;
    const totalPage = Math.ceil(total / limit);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Academic faculties are retrieved successfully!',
        data,
        meta: { total, page, totalPage, limit },
    });
}));
const getAcademicFacultyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const academicFaculty = yield academicFaculty_service_1.academicFacultyServices.getSingleAcademicFacultyById((_c = req.params) === null || _c === void 0 ? void 0 : _c.id);
    if (!academicFaculty) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Academic faculty not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Academic faculty retrieved successfully!',
        data: academicFaculty,
    });
}));
const deleteAcademicFacultyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFaculty = yield academicFaculty_service_1.academicFacultyServices.deleteAcademicFacultyById(req.params.id);
    if (!academicFaculty) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Academic faculty not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Academic faculty is deleted successfully!',
        data: academicFaculty,
    });
}));
const updateAcademicFacultyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const academicFaculty = yield academicFaculty_service_1.academicFacultyServices.updateAcademicFacultyById((_d = req.params) === null || _d === void 0 ? void 0 : _d.id, req.body);
    if (!academicFaculty) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Academic faculty not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Academic faculty is updated successfully!',
        data: academicFaculty,
    });
}));
exports.academicFacultyController = {
    insertAcademicFaculty,
    getAllAcademicFaculties,
    getAcademicFacultyById,
    deleteAcademicFacultyById,
    updateAcademicFacultyById,
};
