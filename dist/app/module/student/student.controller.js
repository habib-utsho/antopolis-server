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
exports.studentController = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const student_service_1 = require("./student.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const appError_1 = __importDefault(require("../../errors/appError"));
const getAllStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { data, total } = yield student_service_1.studentServices.getAllStudent(req.query);
    const page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) ? Number(req.query.page) : 1;
    const limit = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.limit) : 10;
    const totalPage = Math.ceil(total / limit);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Students are retrieved successfully!',
        data,
        meta: { total, page, totalPage, limit },
    });
}));
const getStudentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const student = yield student_service_1.studentServices.getStudentById((_c = req.params) === null || _c === void 0 ? void 0 : _c.id);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Student is retrieved successfully!',
        data: student,
    });
}));
const updateStudentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const student = yield student_service_1.studentServices.updateStudentById((_d = req.params) === null || _d === void 0 ? void 0 : _d.id, req.body);
    if (!student) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Student not updated!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Student updated successfully!',
        data: student,
    });
}));
const deleteStudentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_service_1.studentServices.deleteStudentById(req.params.id);
    if (!student) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Student not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Student is deleted successfully!',
        data: student,
    });
}));
exports.studentController = {
    getAllStudent,
    getStudentById,
    updateStudentById,
    deleteStudentById,
};
