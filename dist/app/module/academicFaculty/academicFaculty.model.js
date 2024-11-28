"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicFacultySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const AcademicFaculty = (0, mongoose_1.model)('AcademicFaculty', academicFacultySchema);
exports.default = AcademicFaculty;
