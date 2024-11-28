"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const preRequisiteCoursesSchema = new mongoose_1.Schema({
    isDeleted: { type: Boolean, default: false },
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Course' }
}, { _id: false });
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    prefix: { type: String, required: true },
    code: { type: Number, required: true, unique: true },
    credit: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    preRequisiteCourses: [preRequisiteCoursesSchema],
});
const Course = (0, mongoose_1.model)('Course', courseSchema);
exports.default = Course;
