import { Router } from "express"
import { param } from "express-validator"
import { body } from "express-validator"
import swaggerUi from 'swagger-ui-express'
import { createProducts, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/products"
import { handleErrors } from "./middleware/handleErrors"
import swaggerSpec from "./config/swagger"
const router = Router()
/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: Id of the product
 *                      example: 10
 *                  name:
 *                      type: string
 *                      description: Name of the product
 *                      example: TV 40 inch
 *                  price:
 *                      type: number
 *                      description: Price of the product
 *                      example: 400
 *                  availability:
 *                      type: boolean
 *                      description: Availability of the product
 *                      example: true
 */

/**
 * @swagger
 *  /api/products:
 *      get:
 *          summary: Get all the products
 *          tags: 
 *              - Products
 *          description: This method return all the products in the DB
 *          responses: 
 *              200:
 *                  description: Succesful response
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: array
 *                      items:
 *                          $ref: "#/components/schemas/Product"
 * 
 * 
 * 
 */
router.get("/", 
    handleErrors,
    getProducts)

/**
 * @swagger
 *  /api/products/{id}:
 *      get:
 *          summary: Get one product by the id
 *          tags: 
 *              - Products
 *          description: This method return one product for the id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product
 *              required: true
 *              schema:
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: "#/components/schemas/Product"
 *              404:
 *                  description: The id non exist
 * 
 */
router.get("/:id", 
    param("id").isInt().withMessage("Esta busqueda requiere un numero"),
    handleErrors,
    getProductsById)

    /**
     * @swagger
     *  /api/products:
     *      post:
     *          summary: Generate a new product in the DB
     *          tags:
     *              - Products
     *          description: This method add a new product
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              name:
     *                                  type: string
     *                                  description: The name of the new product
     *                                  example: Monitor 40 pulgadas
     *                              price:
     *                                  type: number
     *                                  description: The price of the product
     *                                  example: 250
     *          responses:
     *              201:
     *                  description: The element is correctly created
     *              400:
     *                  description: No created
     */
router.post("/", 
    body('name').isString().withMessage("El campo tiene que ser un texto"),
    body('price').isFloat().withMessage("Este campo es numerico")
    .custom(value => value > 0).withMessage("El campo tiene que ser mayor a uno"),
    handleErrors,
    createProducts)

    /**
     * @swagger
     *  /api/products/{id}:
     *      put:
     *          summary: Update a product by the id
     *          tags:
     *              - Products
     *          description: This method is used to update one product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product
 *              required: true
 *              schema:
 *                  type: integer
     *          requestBody: 
     *              required: true
     *              content:    
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              name:
     *                                  type: string
     *                                  description: The name of the new product
     *                                  example: Monitor 40 pulgadas
     *                              price:
     *                                  type: number
     *                                  description: The price of the product
     *                                  example: 250
     *                              availability:
     *                                  type: boolean
     *                                  description: The availability of the product
     *                                  example: false
     *          responses:
     *              200:
     *                  description: The product is correctly updated
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: "#/components/schemas/Product"
     *              404:
     *                  description: The method is failed, incorrect id
     * 
     *                          
     *          
     *              
     * 
     */
router.put("/:id", 
    body("name").isString().withMessage("Este campo tiene que ser texto"),
    body('price').isFloat().withMessage("Este campo es numerico")
    .custom(value => value > 0).withMessage("El campo tiene que ser mayor a uno"),
    handleErrors,
    updateProduct)

    /**
     * @swagger
     *  /api/products/{id}:
     *      patch:
     *          summary: This method is used for update the availability in a product
     *          tags:
     *              - Products
     *          description: Use the method for update only the availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: The product is correctly updated
 *              404:
 *                  description: The id is not correct
     *      
     */
    router.patch("/:id", 
        param('id').isInt().withMessage('No se ha encontrado el producto'),
        handleErrors,
        updateAvailability)

    /**
     * @swagger
     *  /api/products/{id}:
     *      delete:
     *          summary: Delete a product
     *          tags:
     *              - Products
     *          description: Use this method to delete a element for the DB based in the id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product
 *              required: true
 *              schema:
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Element correctly eliminated
 *                  content:
 *                      schema:
 *                          type: string
 *                          example: Elemento eliminado
 *              404: 
 *                  description: The element does exist in the DB, or the id is not correct
     *          
     *  
     */
    router.delete("/:id", 
        param('id').isInt().withMessage('No se ha encontrado el producto'),
        handleErrors,   
        deleteProduct)

export default router