import morgan from "morgan"
import express,{Application} from "express"
import routes from '../routes/index.routes'

//como se va a crear a que puerto se va crear
class Server{
    private app: Application
    public static readonly PORT:number = 3000   // se le asignan en nuestra variable si no funciona o deja de corre el 8000 pasa a 3000 ejemplo
    public port: string | number
     //trae los recursos que va a ocupar el servidor
    constructor(){
        //hace referencia para donde vamos a levantar el servidor
        this.app= express()
        //ayudantes a este entorno o levantarlo 
        this.middlewares()
    }
    //lo que va a ocupar para poder correr
    middlewares(){
        this.app.use (morgan('dev'))
        //la velocidad que va a correr
        this.app.use(express.json({limit:'50mb'}))

        this.app.use(express.urlencoded({extended:true,limit:'50mb'}))

        // importación de lo que hemos puesto en la indexRoutes de routes
        this.app.use('/', routes)
}
listen (){
    this.app.listen((this.port=process.env.PORT || Server.PORT),()=>{
        console.log(`Server is running import ${this.port}`)
    });
    
}

}
export default Server