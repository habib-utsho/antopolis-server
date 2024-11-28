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
exports.authServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ id: loginInfo.id });
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User not found!');
    }
    const decryptPass = yield bcrypt_1.default.compare(loginInfo.password, user.password);
    if (!decryptPass) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Incorrect password!');
    }
    const jwtPayload = { id: user.id, role: user.role };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    return {
        accessToken,
        refreshToken,
        data: user,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
    }
    catch (e) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }
    const { id } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.default.findOne({ id });
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is deleted !');
    }
    // checking if the user is not active
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'inactive') {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is not active!');
    }
    const jwtPayload = {
        id: user.id,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    return {
        accessToken,
    };
});
exports.authServices = { login, refreshToken };
