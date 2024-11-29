"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const animalSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    img: { type: String },
    category: { type: mongoose_1.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });
const Animal = (0, mongoose_1.model)('Animal', animalSchema);
exports.default = Animal;
