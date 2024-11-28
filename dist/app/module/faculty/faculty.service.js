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
exports.facultyServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const faculty_constant_1 = require("./faculty.constant");
const faculty_model_1 = require("./faculty.model");
const getAllFaculty = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyQuery = new QueryBuilder_1.default(faculty_model_1.Faculty.find({}), query)
        .searchQuery(faculty_constant_1.facultySearchableFields)
        .filterQuery()
        .sortQuery()
        .fieldFilteringQuery()
        .paginateQuery()
        .populateQuery([
        { path: 'user', select: '-createdAt -updatedAt -__v' },
        {
            path: 'academicDepartment',
            select: '-createdAt -updatedAt -__v',
            populate: {
                path: 'academicFaculty',
                select: '-createdAt -updatedAt -__v',
            },
        },
    ]);
    const faculty = yield facultyQuery.queryModel;
    return faculty;
});
const getSingleFacultyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield faculty_model_1.Faculty.findById(id)
        .select('-__v')
        .populate('user', '-createdAt -updatedAt -__v')
        .populate('academicDepartment', '-createdAt -updatedAt -__v');
    return faculty;
});
const deleteFacultyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = yield faculty_model_1.Faculty.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).select('-__v');
    return faculty;
});
const updateFacultyById = (id, updatedFaculty) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = updatedFaculty, restProps = __rest(updatedFaculty, ["name"]);
    const modifiedUpdatedFaculty = Object.assign({}, restProps);
    if (name && ((_a = Object.keys(name)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedFaculty[`name.${key}`] = value;
        }
    }
    const faculty = yield faculty_model_1.Faculty.findByIdAndUpdate(id, modifiedUpdatedFaculty, {
        new: true,
    }).select('-__v');
    return faculty;
});
exports.facultyServices = {
    getAllFaculty,
    getSingleFacultyById,
    deleteFacultyById,
    updateFacultyById,
};
