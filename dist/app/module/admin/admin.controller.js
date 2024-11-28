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
exports.adminControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
const getAllAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_service_1.adminServices.getAllAdmin();
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Admins are retrieved successfully!',
        data: admin,
    });
}));
const getAdminById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const admin = yield admin_service_1.adminServices.getSingleAdminById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!admin) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Admin not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Admin is retrieved successfully!',
        data: admin,
    });
}));
const deleteAdminById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_service_1.adminServices.deleteAdminById(req.params.id);
    if (!admin) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Admin not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Admin is deleted successfully!',
        data: admin,
    });
}));
const updateAdminById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const admin = yield admin_service_1.adminServices.updateAdminById((_b = req.params) === null || _b === void 0 ? void 0 : _b.id, req.body);
    if (!admin) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Admin not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Admin is updated successfully!',
        data: admin,
    });
}));
exports.adminControllers = {
    getAllAdmin,
    getAdminById,
    deleteAdminById,
    updateAdminById,
};
