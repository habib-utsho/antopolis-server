"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_route_1 = require("../module/student/student.route");
const user_route_1 = require("../module/user/user.route");
const academicDepartment_route_1 = require("../module/academicDepartment/academicDepartment.route");
const academicFaculty_route_1 = require("../module/academicFaculty/academicFaculty.route");
const batch_route_1 = require("../module/batch/batch.route");
const faculty_route_1 = require("../module/faculty/faculty.route");
const admin_route_1 = require("../module/admin/admin.route");
const course_route_1 = require("../module/course/course.route");
const auth_route_1 = require("../module/auth/auth.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/students',
        route: student_route_1.studentRouter,
    },
    {
        path: '/users',
        route: user_route_1.userRouter,
    },
    {
        path: '/faculties',
        route: faculty_route_1.facultyRouter,
    },
    {
        path: '/admins',
        route: admin_route_1.adminRouter,
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_route_1.academicFacultyRouter,
    },
    {
        path: '/academic-department',
        route: academicDepartment_route_1.academicDepartmentRouter,
    },
    {
        path: '/academic-department',
        route: academicDepartment_route_1.academicDepartmentRouter,
    },
    {
        path: '/batch',
        route: batch_route_1.batchRouter,
    },
    {
        path: '/course',
        route: course_route_1.courseRouter,
    },
    {
        path: '/auth',
        route: auth_route_1.authRouter,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
