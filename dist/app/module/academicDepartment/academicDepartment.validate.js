"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicDepartmentZodSchema = exports.createAcademicDepartmentZodSchema = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentZodSchema = zod_1.z.object({
    name: zod_1.z.string({ invalid_type_error: 'Please input string!', required_error: 'Academic department name is required!' }),
    shortName: zod_1.z.string({ invalid_type_error: 'Please input string!', required_error: 'Academic department short name is required!' }),
    academicFaculty: zod_1.z.string({ invalid_type_error: 'Please input string!', required_error: 'Faculty is required!' }),
});
exports.createAcademicDepartmentZodSchema = createAcademicDepartmentZodSchema;
const updateAcademicDepartmentZodSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    shortName: zod_1.z.string().optional(),
    academicFaculty: zod_1.z.string().optional(),
});
exports.updateAcademicDepartmentZodSchema = updateAcademicDepartmentZodSchema;
