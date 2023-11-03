import { Router } from 'express';
import dotenv from 'dotenv'
import routerRol from './rol.routes'
import routerUser from './user.routes'
import { Rol } from '../models/Rol';

dotenv.config()

const URL = process.env.url  

const routes = Router()

//rutas 
routes.use(`${URL}/rol`, routerRol)
// routes.use(`${URL}/user`, routerUser)

export default routes