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
exports.adminServices = void 0;
const admin_model_1 = require("./admin.model");
const getAllAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.find({}).select('-__v');
    return admin;
});
const getSingleAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.findById(id).select('-__v');
    return admin;
});
const deleteAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).select('-__v');
    return admin;
});
const updateAdminById = (id, updatedAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.Admin.findByIdAndUpdate(id, updatedAdmin, {
        new: true,
    }).select('-__v');
    return admin;
});
exports.adminServices = {
    getAllAdmin,
    getSingleAdminById,
    deleteAdminById,
    updateAdminById,
};
