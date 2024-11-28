"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseZodSchema = exports.createCourseZodSchema = void 0;
const zod_1 = require("zod");
const createCourseZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    prefix: zod_1.z.string(),
    code: zod_1.z.number(),
    credit: zod_1.z.number(),
    isDeleted: zod_1.z.boolean().optional(),
    preRequisiteCourses: zod_1.z.array(zod_1.z.object({
        isDeleted: zod_1.z.boolean().optional(),
        course: zod_1.z.string().optional(),
    })).optional()
});
exports.createCourseZodSchema = createCourseZodSchema;
const updateCourseZodSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    prefix: zod_1.z.string().optional(),
    code: zod_1.z.number().optional(),
    credit: zod_1.z.number().optional(),
    isDeleted: zod_1.z.boolean().optional(),
    preRequisiteCourses: zod_1.z.array(zod_1.z.object({
        isDeleted: zod_1.z.boolean().optional(),
        course: zod_1.z.string().optional(),
    })).optional()
});
exports.updateCourseZodSchema = updateCourseZodSchema;
