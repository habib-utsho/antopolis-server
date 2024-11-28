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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentServices = void 0;
const student_model_1 = require("./student.model");
const students_constant_1 = require("./students.constant");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const getAllStudent = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const queryObj = { ...query }
    // const searchTerm = (query?.searchTerm as string) || ''
    // //   Search by first name, email and presentAddress
    // const searchQuery = Student.find({
    //   $or: studentSearchableFields.map((field) => ({
    //     [field]: { $regex: searchTerm, $options: 'i' },
    //   })),
    // })
    // const excludedFields = ['searchTerm', 'page', 'limit', 'sort', 'fields']
    // excludedFields.forEach((el) => {
    //   delete queryObj[el]
    // })
    // //   Filter by query
    // const filterQuery = searchQuery
    //   .find(queryObj)
    //   .populate('user', '-createdAt -updatedAt -__v')
    //   .populate({
    //     path: 'academicInfo.department',
    //     select: '-createdAt -updatedAt -__v',
    //     populate: {
    //       path: 'academicFaculty',
    //       select: '-createdAt -updatedAt -__v',
    //     },
    //   })
    //   .populate({
    //     path: 'academicInfo.batch',
    //     select: '-createdAt -updatedAt -__v -department',
    //   })
    //   // Fields filtering
    //   const fields = (query?.fields as string) || '-__v'
    //   const fieldFilteringQuery = filterQuery.select(fields.split(',').join(' '))
    // // sort
    // const sort = (query?.sort as string) || '-createdAt'
    // const sortQuery = fieldFilteringQuery.sort(sort)
    // //   Paginate
    // const limit = Number(query?.limit) || 10
    // const skip = query?.page ? (Number(query?.page) - 1) * Number(limit) : 1
    // const paginateQuery = sortQuery.limit(Number(limit)).skip(skip)
    // return paginateQuery
    const studentQuery = new QueryBuilder_1.default(student_model_1.Student.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} isDeleted` }))
        .searchQuery(students_constant_1.studentSearchableFields)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery([
        { path: 'user', select: '-createdAt -updatedAt -__v' },
        {
            path: 'academicInfo.department',
            select: '-createdAt -updatedAt -__v',
            populate: {
                path: 'academicFaculty',
                select: '-createdAt -updatedAt -__v',
            },
        },
        {
            path: 'academicInfo.batch',
            select: '-createdAt -updatedAt -__v -department',
        },
    ]);
    const result = yield (studentQuery === null || studentQuery === void 0 ? void 0 : studentQuery.queryModel);
    const total = yield student_model_1.Student.countDocuments(studentQuery.queryModel.getFilter());
    return { data: result, total };
});
const getStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.Student.findById(id)
        .select('-__v')
        .populate('user', '-createdAt -updatedAt -__v')
        .populate({
        path: 'academicInfo.department',
        select: '-createdAt -updatedAt -__v',
        populate: {
            path: 'academicFaculty',
            select: '-createdAt -updatedAt -__v',
        },
    })
        .populate({
        path: 'academicInfo.batch',
        select: '-createdAt -updatedAt -__v -department',
    });
    return student;
});
const updateStudentById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { name, guardian } = payload, restStudentData = __rest(payload, ["name", "guardian"]);
    const modifiedUpdatedData = Object.assign({}, restStudentData);
    // update non primitive values
    // Update name
    if (name && ((_a = Object.keys(name)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    // update guardian
    if (guardian && ((_b = Object.keys(guardian)) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    const student = yield student_model_1.Student.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
    })
        .select('-__v')
        .populate('user', '-createdAt -updatedAt -__v -department')
        .populate('academicInfo.department')
        .populate('academicInfo.batch');
    return student;
});
const deleteStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.Student.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).select('-__v');
    return student;
});
exports.studentServices = {
    getAllStudent,
    getStudentById,
    updateStudentById,
    deleteStudentById,
};
