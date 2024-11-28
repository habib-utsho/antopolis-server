"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentZodSchema = exports.createStudentZodSchema = void 0;
const zod_1 = require("zod");
const createStudentZodSchema = zod_1.z.object({
    name: zod_1.z.object({
        firstName: zod_1.z.string(),
        middleName: zod_1.z.string().optional(),
        lastName: zod_1.z.string(),
    }),
    profileImg: zod_1.z.string().optional(),
    gender: zod_1.z.enum(['male', 'female', 'other']),
    dateOfBirth: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string(),
    nid: zod_1.z.string(),
    presentAddress: zod_1.z.string(),
    permanentAddress: zod_1.z.string(),
    guardian: zod_1.z.object({
        name: zod_1.z.string(),
        phone: zod_1.z.string(),
        age: zod_1.z.string(),
        email: zod_1.z.string().optional(),
    }),
    bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    academicInfo: zod_1.z.object({
        department: zod_1.z.string(),
        // roll: z.number().int().max(Number(process.env.MAX_STUDENT_PER_BATCH), 'Roll number exceeds the maximum limit.').min(1, 'Roll number must be greater than 0.'),
        batch: zod_1.z.string(),
    }),
});
exports.createStudentZodSchema = createStudentZodSchema;
const updateStudentZodSchema = zod_1.z.object({
    name: zod_1.z
        .object({
        firstName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
    })
        .optional(),
    profileImg: zod_1.z.string().optional(),
    gender: zod_1.z.enum(['male', 'female', 'other']).optional(),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    nid: zod_1.z.string().optional(),
    presentAddress: zod_1.z.string().optional(),
    permanentAddress: zod_1.z.string().optional(),
    guardian: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        age: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
    })
        .optional(),
    bloodGroup: zod_1.z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
});
exports.updateStudentZodSchema = updateStudentZodSchema;
