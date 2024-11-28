"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicDepartmentSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    shortName: { type: String, required: true, unique: true },
    totalStudent: { type: Number, default: 0 },
    totalFaculty: { type: Number, default: 0 },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const AcademicDepartment = (0, mongoose_1.model)('AcademicDepartment', academicDepartmentSchema);
exports.default = AcademicDepartment;
