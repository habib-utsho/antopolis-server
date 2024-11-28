"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_route_1 = require("../module/category/category.route");
const animal_route_1 = require("../module/animal/animal.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/category',
        route: category_route_1.categoryRouter,
    },
    {
        path: '/animal',
        route: animal_route_1.animalRouter,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
