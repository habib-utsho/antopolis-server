"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authZodSchema = void 0;
const zod_1 = require("zod");
const authZodSchema = zod_1.z.object({
    id: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.authZodSchema = authZodSchema;
