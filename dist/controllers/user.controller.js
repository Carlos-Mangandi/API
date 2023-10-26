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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const User_1 = require("../models/User");
const userRepository = data_source_1.AppDataSource
    .getRepository("User");
class UserController {
}
_a = UserController;
UserController.createUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const user = new User_1.User();
        user.name = name,
            user.email = email,
            user.password = password;
        yield userRepository.save(user);
        return resp.json({ ok: true, STATUS_CODE: 200, message: 'User was create with successfully' });
    }
    catch (error) {
        return resp.json({ ok: false, message: `error = ${error.message}`
        });
    }
});
UserController.getUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository.find({ where: { state: true } });
        return users.length > 0
            ? resp.json({ ok: true, message: 'list of users', users }) : resp.json({ ok: false, message: 'Not found', users });
    }
    catch (error) {
        return resp.json({ ok: false, message: `error => ${error.message}` });
    }
});
UserController.byIdUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const user = yield userRepository.findOne({ where: { id, state: true } });
        return user
            ? resp.json({ ok: true, user }) : resp.json({ ok: false, message: "The id don't exist" });
    }
    catch (error) {
        return resp.json({ ok: false, message: `error = ${error.message}` });
    }
});
UserController.deleteUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const user = yield userRepository.findOne({ where: { id, state: true } });
        if (!user) {
            throw new Error("Not fund");
        }
        user.state = false;
        yield userRepository.save(user);
        return resp.json({ ok: true, message: "User was delete" });
    }
    catch (error) {
        return resp.json({ ok: false, message: `error => ${error.message}` });
    }
});
UserController.updateUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    //let user: User
    try {
        const user = yield userRepository.findOne({ where: { id, state: true }, });
        if (!name) {
            throw new Error('Not Fund');
        }
        user.name = name,
            user.email = email;
        yield userRepository.save(user);
        return resp.json({ ok: true, STATUS_CODE: 200, message: 'User was updated', user });
    }
    catch (error) {
        return resp.json({ ok: false, STATUS_CODE: 500, message: `error = ${error.message}` });
    }
});
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map