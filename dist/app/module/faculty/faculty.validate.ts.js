"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacultyZodSchema = exports.createFacultyZodSchema = void 0;
const zod_1 = require("zod");
const createFacultyZodSchema = zod_1.z.object({
    designation: zod_1.z.string(),
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
    presentAddress: zod_1.z.string(),
    permanentAddress: zod_1.z.string(),
    profileImg: zod_1.z.string().optional(),
    academicDepartment: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.createFacultyZodSchema = createFacultyZodSchema;
const updateFacultyZodSchema = zod_1.z.object({
    designation: zod_1.z.string().optional(),
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
    presentAddress: zod_1.z.string().optional(),
    permanentAddress: zod_1.z.string().optional(),
    profileImg: zod_1.z.string().optional(),
    academicDepartment: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.updateFacultyZodSchema = updateFacultyZodSchema;
