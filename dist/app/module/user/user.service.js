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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = __importDefault(require("./user.model"));
const appError_1 = __importDefault(require("../../errors/appError"));
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("../student/student.model");
const batch_model_1 = __importDefault(require("../batch/batch.model"));
const academicDepartment_model_1 = __importDefault(require("../academicDepartment/academicDepartment.model"));
const faculty_model_1 = require("../faculty/faculty.model");
const admin_model_1 = require("../admin/admin.model");
const insertStudentToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const alreadyExistEmail = yield student_model_1.Student.findOne({ email: payload.email });
        const alreadyExistNid = yield student_model_1.Student.findOne({ nid: payload.nid });
        const alreadyExistPhone = yield student_model_1.Student.findOne({ phone: payload.phone });
        if (alreadyExistEmail) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Email is already exist. Try with different email!');
        }
        if (alreadyExistNid) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'NID is already exist. Try with different NID!');
        }
        if (alreadyExistPhone) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Phone is already exist. Try with different phone!');
        }
        const academicDepartment = yield academicDepartment_model_1.default.findById(payload.academicInfo.department);
        const totalStudent = yield student_model_1.Student.countDocuments({}).exec();
        const batch = yield batch_model_1.default.findById((_a = payload.academicInfo) === null || _a === void 0 ? void 0 : _a.batch);
        const deptExistInBatch = yield batch_model_1.default.findOne({
            department: payload.academicInfo.department,
            _id: payload.academicInfo.batch,
        });
        // console.log(department, 'department');
        // console.log(totalStudent, 'totalStudent');
        if (!academicDepartment) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Department not found');
        }
        if (!batch) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Batch not found');
        }
        if (!deptExistInBatch) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Department does not match with batch. Please provide correct batch and department ID.');
        }
        // Update regSlNo and regCode and id
        const regSlNo = totalStudent > 0 ? totalStudent + 1 : 1;
        const regCode = `${academicDepartment.shortName}-${batch === null || batch === void 0 ? void 0 : batch.batch}-${regSlNo}`;
        payload.academicInfo.regSlNo = regSlNo;
        payload.academicInfo.regCode = regCode;
        payload.id = regCode;
        // Check if batch has reached the maximum student limit
        const maxStudentsPerBatch = Number(process.env.MAX_STUDENT_PER_BATCH) || 45; // Default to 45 if not set
        if (batch.totalStudent >= maxStudentsPerBatch) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Batch is full');
        }
        // Update roll and totalStudent of batch
        payload.academicInfo.roll = batch.totalStudent + 1;
        batch.totalStudent += 1;
        yield batch.save({ session });
        // Update totalStudent of department
        academicDepartment.totalStudent += 1;
        yield academicDepartment.save({ session });
        const userData = {
            id: regCode,
            password: payload.password || '1234@@aA',
            needsPasswordChange: true,
            role: 'student',
        };
        // Save user
        const user = yield user_model_1.default.create([userData], { session });
        if (!(user === null || user === void 0 ? void 0 : user.length)) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to insert user to db');
        }
        const studentData = Object.assign(Object.assign({}, payload), { id: regCode, user: user[0]._id, academicInfo: Object.assign({}, payload.academicInfo) });
        // Save student
        const student = yield student_model_1.Student.create([studentData], { session });
        if (!(student === null || student === void 0 ? void 0 : student.length)) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to insert student to db');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return student[0];
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const insertFacultyToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const alreadyExistEmail = yield faculty_model_1.Faculty.findOne({ email: payload.email });
        const alreadyExistNid = yield faculty_model_1.Faculty.findOne({ nid: payload.nid });
        const alreadyExistPhone = yield faculty_model_1.Faculty.findOne({ phone: payload.phone });
        if (alreadyExistEmail) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Email is already exist. Try with different email!');
        }
        if (alreadyExistNid) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'NID is already exist. Try with different NID!');
        }
        if (alreadyExistPhone) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Phone is already exist. Try with different phone!');
        }
        const department = yield academicDepartment_model_1.default.findById(payload.academicDepartment);
        const totalFaculty = yield faculty_model_1.Faculty.countDocuments({}).exec();
        if (!department) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Department not found');
        }
        // Update id
        const slNo = totalFaculty > 0 ? totalFaculty + 1 : 1;
        const id = `F-${department.shortName}-${slNo.toString().padStart(4, '0')}`;
        // Update totalFaculty of department
        department.totalFaculty += 1;
        yield department.save({ session });
        const userData = {
            id,
            password: payload.password || '1234@@aA',
            role: 'faculty',
        };
        // Save user
        const user = yield user_model_1.default.create([userData], { session });
        if (!(user === null || user === void 0 ? void 0 : user.length)) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to insert user to db');
        }
        const facultyData = Object.assign(Object.assign({}, payload), { id, user: user[0]._id });
        // Save faculty
        const faculty = yield faculty_model_1.Faculty.create([facultyData], { session });
        if (!(faculty === null || faculty === void 0 ? void 0 : faculty.length)) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to insert faculty to db');
        }
        yield session.commitTransaction();
        return faculty[0];
    }
    catch (err) {
        yield session.abortTransaction();
        throw new Error(err);
    }
    finally {
        yield session.endSession();
    }
});
const insertAdminToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const alreadyExistEmail = yield faculty_model_1.Faculty.findOne({ email: payload.email });
        const alreadyExistNid = yield faculty_model_1.Faculty.findOne({ nid: payload.nid });
        const alreadyExistPhone = yield faculty_model_1.Faculty.findOne({ phone: payload.phone });
        if (alreadyExistEmail) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Email is already exist. Try with different email!');
        }
        if (alreadyExistNid) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'NID is already exist. Try with different NID!');
        }
        if (alreadyExistPhone) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Phone is already exist. Try with different phone!');
        }
        const totalAdmin = yield admin_model_1.Admin.countDocuments({}).exec();
        // Update id
        const slNo = totalAdmin > 0 ? totalAdmin + 1 : 1;
        const id = `A-${slNo.toString().padStart(4, '0')}`;
        const userData = {
            id,
            password: payload.password || '1234@@aA',
            role: 'admin',
        };
        // Save user
        const user = yield user_model_1.default.create([userData], { session });
        if (!(user === null || user === void 0 ? void 0 : user.length)) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to insert user to db');
        }
        const adminData = Object.assign(Object.assign({}, payload), { id, user: user[0]._id });
        // Save admin
        const admin = yield admin_model_1.Admin.create([adminData], { session });
        if (!(admin === null || admin === void 0 ? void 0 : admin.length)) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to insert admin to db');
        }
        yield session.commitTransaction();
        return admin[0];
    }
    catch (err) {
        yield session.abortTransaction();
        throw new Error(err);
    }
    finally {
        yield session.endSession();
    }
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({}).select('-__v');
    return users;
});
const getSingleUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id).select('-__v');
    return user;
});
exports.userServices = {
    insertStudentToDb,
    insertFacultyToDb,
    insertAdminToDb,
    getAllUser,
    getSingleUserById,
};
