"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
// Define the name schema
const NameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, default: null },
    lastName: { type: String, required: true },
}, { _id: false });
// Define the TStudent schema
const AdminSchema = new mongoose_1.Schema({
    id: { type: String },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
    },
    designation: {
        type: String,
        enum: ['admin', 'super admin'],
        default: 'admin',
    },
    name: { type: NameSchema, required: true },
    profileImg: {
        type: String,
        default: function () {
            return this.gender === 'male'
                ? 'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png'
                : this.gender === 'female'
                    ? 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png'
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxbloQR1_FBnDB7WUPxwRB3geLh77OCHBnA&s';
        },
    },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    nid: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
});
// Create the model
const Admin = (0, mongoose_1.model)('Admin', AdminSchema);
exports.Admin = Admin;
