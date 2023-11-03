import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Rol } from "../models/Rol";
import { error } from "console";
import { type } from "os";

const roleRepository = AppDataSource // esta será una conexión global 
    .getRepository("Rol"); // aca tenemos que colocar a la entidad a la cual vamos a utilizar

class RoleController{
    //crear instancias 
    // promesa es un objeto que representa la terminación o el fracaso de una operación asíncrona si un cliente hace una petición e espera a que se le 
    // mande una respuesta y por eso el nombre de promesa
    static createRol = async(req:Request, resp:Response)=>{
        const { type } = req.body //desestructuración de objeto dentro de las llaves podrían ir los otros campos com name siempre separados por coma
        try {
            const rol = new Rol()
            rol.type = type
            await roleRepository.save(rol)  //el await va a esperar a que la promesa le mande una solución

            return resp.json({ ok: true, STATUS_CODE: 200, message: 'Rol was create with successfully'})
        } catch (error) {
            return resp.json({ok: false, STATUS_CODE: 500, message: `error = ${error.message}`})
            
        }
    }

    // => se llama función de flecha
    static getRoles = async (req:Request, resp:Response)=>{
        
        try {
            const rol = await roleRepository.find({ where : {state:true} })
            return rol.length>0 
                ?resp.json({ok:true, rol}) : resp.json({ok:false, msg:'Not found'})
        } catch (error) {
            return resp.json({ok: false, message: `error = ${error.message}`})
        }
    }

    static byIdRol = async (req:Request, resp:Response)=>{
        const id = parseInt(req.params.id) 
        try {
            const rol = await roleRepository.findOne({ where: {id,  state: true }})
            return rol ? resp.json({ ok: true, rol}) : resp.json({ ok: false, msg: "The id don´t exist" });
        } catch (error) {
            return resp.json({ ok: false, message: `error = ${error.message}` })
        }
    }
    
    static deleteRol = async(req:Request, resp:Response)=>{
        const id = parseInt(req.params.id)
        try{
            const rol = await roleRepository.findOne({where:{id, state: true}})

            if(!rol){
                throw new Error("Not fund")
            }
            rol.state = false;
            await roleRepository.save(rol)
            return resp.json({ ok: true, msg: 'Rol was delete'
            })  
        }catch(error){
            return resp.json({ ok:false, message: `error = ${error.message}`
            }) 
        }
    }
    
    static updateRol = async(req:Request, resp:Response)=>{
        const id = parseInt(req.params.id)
        const {type} = req.body
        //let role : Rol // variable
        try{   
            const role = await roleRepository.findOne({ where: { id, state: true },})

            if(!type){
                throw new Error('Not Fund')
            }

            role.type = type
            await roleRepository.save(role)
            return resp.json({ ok: true, STATUS_CODE:200, message: 'Role was updated', role})
        }
        catch (error){
            return resp.json ({ok:false, STATUS_CODE:500,   message: `error = ${error.message}`})
        }
    }

    
    // get = solo se pueden mandar params y querys}
    // un método es un algoritmo
    // filtro y código
}

export default RoleController

