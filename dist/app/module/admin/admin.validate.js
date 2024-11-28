"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminZodSchema = exports.createAdminZodSchema = void 0;
const zod_1 = require("zod");
const createAdminZodSchema = zod_1.z.object({
    designation: zod_1.z.enum(['admin', 'super admin']).optional(),
    name: zod_1.z.object({
        firstName: zod_1.z.string(),
        middleName: zod_1.z.string().optional(),
        lastName: zod_1.z.string(),
    }),
    gender: zod_1.z.string(),
    dateOfBirth: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    nid: zod_1.z.string(),
    bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    profileImg: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.createAdminZodSchema = createAdminZodSchema;
const updateAdminZodSchema = zod_1.z.object({
    designation: zod_1.z.enum(['admin', 'super admin']).optional(),
    name: zod_1.z
        .object({
        firstName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
    })
        .optional(),
    gender: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    nid: zod_1.z.string().optional(),
    bloodGroup: zod_1.z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
    profileImg: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.updateAdminZodSchema = updateAdminZodSchema;
