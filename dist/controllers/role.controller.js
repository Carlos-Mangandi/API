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
const Rol_1 = require("../models/Rol");
const roleRepository = data_source_1.AppDataSource // esta será una conexión global 
    .getRepository("Rol"); // aca tenemos que colocar a la entidad a la cual vamos a utilizar
class RoleController {
}
_a = RoleController;
//crear instancias 
// promesa es un objeto que representa la terminación o el fracaso de una operación asíncrona si un cliente hace una petición e espera a que se le 
// mande una respuesta y por eso el nombre de promesa
RoleController.createRol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.body; //desestructuración de objeto dentro de las llaves podrían ir los otros campos com name siempre separados por coma
    try {
        const rol = new Rol_1.Rol();
        rol.type = type;
        yield roleRepository.save(rol); //el await va a esperar a que la promesa le mande una solución
        return resp.json({ ok: true, STATUS_CODE: 200, message: 'Rol was create with successfully' });
    }
    catch (error) {
        return resp.json({ ok: false, STATUS_CODE: 500, message: `error = ${error.message}` });
    }
});
// => se llama función de flecha
RoleController.getRoles = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rol = yield roleRepository.findOne({ where: { state: true } });
        return rol.length > 0
            ? resp.json({ ok: true, rol }) : resp.json({ ok: false, msg: 'Not found' });
    }
    catch (error) {
        return resp.json({ ok: false, message: `error = ${error.message}` });
    }
});
RoleController.byIdRol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const rol = yield roleRepository.findOne({ where: { id, state: true } });
        return rol ? resp.json({ ok: true, rol }) : resp.json({ ok: false, msg: "The id don´t exist" });
    }
    catch (error) {
        return resp.json({ ok: false, message: `error = ${error.message}` });
    }
});
RoleController.deleteRol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const rol = yield roleRepository.findOne({ where: { id, state: true } });
        if (!rol) {
            throw new Error("Not fund");
        }
        rol.state = false;
        yield roleRepository.save(rol);
        return resp.json({ ok: true, msg: 'Rol was delete'
        });
    }
    catch (error) {
        return resp.json({ ok: false, message: `error = ${error.message}`
        });
    }
});
RoleController.updateRol = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { type } = req.body;
    //let role : Rol // variable
    try {
        const role = yield roleRepository.findOne({ where: { id, state: true }, });
        if (!type) {
            throw new Error('Not Fund');
        }
        role.type = type;
        yield roleRepository.save(role);
        return resp.json({ ok: true, STATUS_CODE: 200, message: 'Role was updated', role });
    }
    catch (error) {
        return resp.json({ ok: false, STATUS_CODE: 500, message: `error = ${error.message}` });
    }
});
exports.default = RoleController;
//# sourceMappingURL=role.controller.js.map