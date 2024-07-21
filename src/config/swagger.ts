import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const swaggerOptions: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'Products',
                description: 'API operations relationed for products'
            }
        ],
        info: {
            title: 'Rest API Typescript / Express / React',
            version: '1.0.0',
            description: 'Api Docs for products'
        },
    },
    apis: ['./src/routes.ts'],
}
export const swaggerUiOptions : SwaggerUiOptions = {
    customCss: ``,
    customSiteTitle: 'API using typescript, express'

}
const swaggerSpec = swaggerJSDoc(swaggerOptions)
export default swaggerSpec