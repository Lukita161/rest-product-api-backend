import express from 'express'
import router from './routes'
import db from './config/db'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import { CorsOptions } from 'cors'
import morgan from 'morgan' 
import cors from 'cors'
const server = express()

const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.CORS_URL) {
            callback(null, true)
        } else {
            new Error('Error de CORS')
        }
    }
}

export const conectionDB = async()=> {
    try {
        await db.authenticate()
        db.sync()
    } catch (error) {
        console.log('Ha ocurrido un error con la conexion a la base de datos')
    }
}
conectionDB()
server.use(morgan('dev'))
server.use(cors(corsOptions))
server.use(express.json())
server.use("/api/products", router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server