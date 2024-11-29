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
exports.animalServices = void 0;
const animal_model_1 = __importDefault(require("./animal.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const animal_constant_1 = require("./animal.constant");
const uploadImgToCloudinary_1 = require("../../utils/uploadImgToCloudinary");
const insertAnimal = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // file upload
    const cloudinaryRes = yield (0, uploadImgToCloudinary_1.uploadImgToCloudinary)(`${payload.name}-${Date.now()}`, file.path);
    if (cloudinaryRes) {
        payload.img = cloudinaryRes.secure_url;
    }
    const animal = yield animal_model_1.default.create(payload);
    return animal;
});
const getAllAnimals = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const animalQuery = new QueryBuilder_1.default(animal_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `name` }))
        .searchQuery(animal_constant_1.animalSearchableFields)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .populateQuery([{ path: 'category', select: 'name' }])
        .fieldFilteringQuery();
    const result = yield (animalQuery === null || animalQuery === void 0 ? void 0 : animalQuery.queryModel);
    const total = yield animal_model_1.default.countDocuments(animalQuery === null || animalQuery === void 0 ? void 0 : animalQuery.queryModel.getFilter());
    return { data: result, total };
});
const getSingleAnimalById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const animal = yield animal_model_1.default.findById(id);
    return animal;
});
exports.animalServices = {
    insertAnimal,
    getAllAnimals,
    getSingleAnimalById,
};
