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
exports.academicFacultyServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const academicFaculty_constant_1 = require("./academicFaculty.constant");
const academicFaculty_model_1 = __importDefault(require("./academicFaculty.model"));
const insertAcademicFacultyToDb = (academicFacultyData) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFaculty = yield academicFaculty_model_1.default.create(academicFacultyData);
    return academicFaculty;
});
const getAllAcademicFaculties = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFacultyQuery = new QueryBuilder_1.default(academicFaculty_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} isDeleted` }))
        .searchQuery(academicFaculty_constant_1.academicFacultySearchableFields)
        .filterQuery()
        .paginateQuery()
        .sortQuery()
        .fieldFilteringQuery()
        .populateQuery([]);
    const result = yield academicFacultyQuery.queryModel;
    const total = yield academicFaculty_model_1.default.countDocuments(academicFacultyQuery.queryModel.getFilter());
    return { data: result, total };
});
const getSingleAcademicFacultyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFaculty = yield academicFaculty_model_1.default.findById(id).select('-__v');
    return academicFaculty;
});
const deleteAcademicFacultyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFaculty = yield academicFaculty_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).select('-__v');
    return academicFaculty;
});
const updateAcademicFacultyById = (id, updatedAcademicFaculty) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFaculty = yield academicFaculty_model_1.default.findByIdAndUpdate(id, updatedAcademicFaculty, { new: true }).select('-__v');
    return academicFaculty;
});
exports.academicFacultyServices = {
    insertAcademicFacultyToDb,
    getAllAcademicFaculties,
    getSingleAcademicFacultyById,
    deleteAcademicFacultyById,
    updateAcademicFacultyById,
};
