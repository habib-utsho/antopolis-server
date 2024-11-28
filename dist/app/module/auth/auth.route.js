"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const auth_validate_1 = require("./auth.validate");
const router = (0, express_1.Router)();
exports.authRouter = router;
router.post('/login', (0, zodValidateHandler_1.default)(auth_validate_1.authZodSchema), auth_controller_1.authControllers.login);
router.post('/forget-password');
router.post('/refresh-token', auth_controller_1.authControllers.refreshToken);
