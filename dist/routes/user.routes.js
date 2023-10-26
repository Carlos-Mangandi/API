"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = (0, express_1.Router)();
const user = user_controller_1.default;
router.post("/", user.createUser);
router.get("/", user.getUser);
router.get("/:id", user.byIdUser);
router.delete("/:id", user.deleteUser);
router.put("/:id", user.updateUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map