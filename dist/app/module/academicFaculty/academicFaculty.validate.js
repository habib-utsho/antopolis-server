"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicFacultyZodSchema = exports.createAcademicFacultyZodSchema = void 0;
const zod_1 = require("zod");
const createAcademicFacultyZodSchema = zod_1.z.object({
    name: zod_1.z.string({ invalid_type_error: 'Please input string!', required_error: 'Academic faculty name is required!' }),
});
exports.createAcademicFacultyZodSchema = createAcademicFacultyZodSchema;
const updateAcademicFacultyZodSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
});
exports.updateAcademicFacultyZodSchema = updateAcademicFacultyZodSchema;
