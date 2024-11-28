"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
// Define the TGuardian schema
const GuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, default: null },
}, { _id: false });
// Define the name schema
const NameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, default: null },
    lastName: { type: String, required: true },
}, { _id: false });
// Academic info schema
const AcademicInfo = new mongoose_1.Schema({
    department: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicDepartment',
    },
    roll: { type: Number, default: 1 },
    batch: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Batch',
    },
    admissionDate: { type: Date, default: new Date() },
    admissionYear: { type: Number },
    graduationYear: { type: Number, default: null },
    regSlNo: { type: Number },
    regCode: { type: String },
}, { _id: false });
// Define the TStudent schema
const StudentSchema = new mongoose_1.Schema({
    id: { type: String },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        immutable: true,
    },
    academicInfo: { type: AcademicInfo, required: true, immutable: true },
    name: { type: NameSchema, required: true },
    profileImg: {
        type: String,
        default: function () {
            return this.gender === 'male'
                ? 'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png'
                : this.gender === 'female'
                    ? 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png'
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxbloQR1_FBnDB7WUPxwRB3geLh77OCHBnA&s';
        },
    },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    nid: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: GuardianSchema, required: true },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
    },
    isDeleted: { type: Boolean, required: true, default: false },
});
// Pre hook
StudentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            // Set admissionYear as the year of admissionDate
            if ((_a = this.academicInfo) === null || _a === void 0 ? void 0 : _a.admissionDate) {
                this.academicInfo.admissionYear =
                    (_c = (_b = this.academicInfo) === null || _b === void 0 ? void 0 : _b.admissionDate) === null || _c === void 0 ? void 0 : _c.getFullYear();
            }
            next();
        }
        catch (e) {
            next(e);
        }
    });
});
// Create the model
const Student = (0, mongoose_1.model)('student', StudentSchema);
exports.Student = Student;
