"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnimalZodSchema = exports.createAnimalZodSchema = void 0;
const zod_1 = require("zod");
const createAnimalZodSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: 'Please input string!',
        required_error: 'Animal name is required!',
    }),
    category: zod_1.z.string({
        invalid_type_error: 'Please input a valid category ID!',
        required_error: 'Category ID is required!',
    }),
});
exports.createAnimalZodSchema = createAnimalZodSchema;
const updateAnimalZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: 'Please input string!',
    })
        .optional(),
    category: zod_1.z
        .string({
        invalid_type_error: 'Please input a valid category ID!',
    })
        .optional(),
});
exports.updateAnimalZodSchema = updateAnimalZodSchema;
