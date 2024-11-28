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
exports.courseServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_model_1 = __importDefault(require("./course.model"));
const course_constant_1 = require("./course.constant");
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_codes_1 = require("http-status-codes");
const insertCourseToDb = (course) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.create(course);
    return result;
});
const getAllCourse = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.default.find(), query)
        .searchQuery(course_constant_1.courseSearchableFields)
        .filterQuery()
        .paginateQuery()
        .sortQuery()
        .fieldFilteringQuery()
        .populateQuery([
        {
            path: 'preRequisiteCourses.course',
        },
    ]);
    const result = yield courseQuery.queryModel;
    return result;
});
const getSingleCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.findById(id).populate('preRequisiteCourses.course');
    return result;
});
const deleteCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const updateCourseById = (id, updatedCourse) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { preRequisiteCourses } = updatedCourse, basicInfo = __rest(updatedCourse, ["preRequisiteCourses"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Update basic course information
        let result = yield course_model_1.default.findByIdAndUpdate(id, basicInfo, {
            new: true,
            session,
        });
        if (!result) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update course basic info!');
        }
        if (preRequisiteCourses && ((_a = Object.keys(preRequisiteCourses)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const filteredDeletedPreRequisiteCourses = preRequisiteCourses === null || preRequisiteCourses === void 0 ? void 0 : preRequisiteCourses.filter((el) => el.course && el.isDeleted).map((el) => el.course);
            const filteredAddPreRequisiteCourses = preRequisiteCourses === null || preRequisiteCourses === void 0 ? void 0 : preRequisiteCourses.filter((el) => el.course && !el.isDeleted).map((el) => el.course);
            if ((filteredDeletedPreRequisiteCourses === null || filteredDeletedPreRequisiteCourses === void 0 ? void 0 : filteredDeletedPreRequisiteCourses.length) > 0) {
                result = yield course_model_1.default.findByIdAndUpdate(id, {
                    $pull: {
                        preRequisiteCourses: {
                            course: { $in: filteredDeletedPreRequisiteCourses },
                        },
                    },
                }, { new: true, session });
            }
            if (!result) {
                throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update course!');
            }
            if ((filteredAddPreRequisiteCourses === null || filteredAddPreRequisiteCourses === void 0 ? void 0 : filteredAddPreRequisiteCourses.length) > 0) {
                result = yield course_model_1.default.findByIdAndUpdate(id, {
                    $addToSet: {
                        preRequisiteCourses: { $each: filteredAddPreRequisiteCourses === null || filteredAddPreRequisiteCourses === void 0 ? void 0 : filteredAddPreRequisiteCourses.map(courseId => ({ course: courseId, isDeleted: false })) },
                    },
                }, { new: true, session });
            }
            if (!result) {
                throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update course!');
            }
        }
        yield session.commitTransaction();
        result = yield course_model_1.default.findByIdAndUpdate(id).populate('preRequisiteCourses.course');
        return result;
    }
    catch (e) {
        yield session.abortTransaction();
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update course!');
    }
    finally {
        yield session.endSession();
    }
    const result = yield course_model_1.default.findByIdAndUpdate(id, basicInfo, { new: true });
    return result;
});
exports.courseServices = {
    insertCourseToDb,
    getAllCourse,
    getSingleCourseById,
    deleteCourseById,
    updateCourseById,
};
