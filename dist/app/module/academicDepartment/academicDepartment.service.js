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
exports.academicDepartmentServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const academicFaculty_model_1 = __importDefault(require("../academicFaculty/academicFaculty.model"));
const academicDepartment_model_1 = __importDefault(require("./academicDepartment.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const academicDepartment_constant_1 = require("./academicDepartment.constant");
const insertAcademicDepartmentToDb = (academicDepartmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistAcademicFaculty = yield academicFaculty_model_1.default.findById(academicDepartmentData === null || academicDepartmentData === void 0 ? void 0 : academicDepartmentData.academicFaculty);
    if (!isExistAcademicFaculty) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Academic faculty not found!');
    }
    const academicDepartment = yield academicDepartment_model_1.default.create(academicDepartmentData);
    return academicDepartment;
});
const getAllAcademicDepartments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartmentQuery = new QueryBuilder_1.default(academicDepartment_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} isDeleted` }))
        .searchQuery(academicDepartment_constant_1.academicDepartmentSearchableFields)
        .filterQuery()
        .paginateQuery()
        .sortQuery()
        .fieldFilteringQuery()
        .populateQuery([
        {
            path: 'academicFaculty',
            select: '_id name',
        },
    ]);
    const result = yield academicDepartmentQuery.queryModel;
    const total = yield academicDepartment_model_1.default.countDocuments(academicDepartmentQuery.queryModel.getFilter());
    return { data: result, total };
});
const getSingleAcademicDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartment = yield academicDepartment_model_1.default.findById(id)
        .select('-__v')
        .populate('academicFaculty', '_id, name');
    return academicDepartment;
});
const deleteAcademicDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartment = yield academicDepartment_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).select('-__v');
    return academicDepartment;
});
const updateAcademicDepartmentById = (id, updatedAcademicDepartment) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartment = yield academicDepartment_model_1.default.findByIdAndUpdate(id, updatedAcademicDepartment, { new: true }).select('-__v');
    return academicDepartment;
});
exports.academicDepartmentServices = {
    insertAcademicDepartmentToDb,
    getAllAcademicDepartments,
    getSingleAcademicDepartmentById,
    deleteAcademicDepartmentById,
    updateAcademicDepartmentById,
};
