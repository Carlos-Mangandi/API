"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const rol_routes_1 = __importDefault(require("./rol.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
dotenv_1.default.config();
const URL = process.env.url; // 
const routes = (0, express_1.Router)();
//rutas 
routes.use(`${URL}/rol`, rol_routes_1.default);
routes.use(`${URL}/user`, user_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.routes.js.map