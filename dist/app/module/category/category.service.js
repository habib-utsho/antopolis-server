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
exports.categoryServices = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const category_constant_1 = require("./category.constant");
const insertCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.create(payload);
    return category;
});
const getAllCategories = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryQuery = new QueryBuilder_1.default(category_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `name` }))
        .searchQuery(category_constant_1.categorySearchableFields)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery();
    const result = yield (categoryQuery === null || categoryQuery === void 0 ? void 0 : categoryQuery.queryModel);
    const total = yield category_model_1.default.countDocuments(categoryQuery === null || categoryQuery === void 0 ? void 0 : categoryQuery.queryModel.getFilter());
    return { data: result, total };
});
const getSingleCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.findById(id);
    return category;
});
exports.categoryServices = {
    insertCategory,
    getAllCategories,
    getSingleCategoryById,
};
