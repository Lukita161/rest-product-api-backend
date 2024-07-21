import { Request, Response } from "express"
import Product from "../models/Product.model"
import { body } from "express-validator"

export const createProducts = async(req: Request, res: Response)=> {
    const product = await Product.create(req.body)
    res.status(201).json({data: product})
    console.log(req.body)
    
}

export const getProductsById = async(req: Request, res: Response) => {

        const { id } = req.params
        const obtainedProduct = await Product.findByPk(id)
        if(!obtainedProduct) {
            return res.status(404).json({error: "No se ha encontrado el producto"})
        }
        res.json({data: obtainedProduct})
    }


export const getProducts = async (req: Request, res: Response)=> {
    const obteinedProducts = await Product.findAll()
    
    res.json({data: obteinedProducts})
}

export const updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params
        const obtainedProduct = await Product.findByPk(id)
        if(!obtainedProduct) {
            return res.status(404).json({error: "No se ha encontrado el producto"})
        }
        await obtainedProduct.update(req.body)
        await obtainedProduct.save()

        res.json({data: obtainedProduct})
}

export const updateAvailability = async (req: Request, res: Response) => {

        const { id } = req.params
        const product = await Product.findByPk(id)
        if(!product) {
            return res.status(404).json({error: "No se ha encontrado el producto"})
        }
        const updatedProduct = await product.update({availability: !product.dataValues.availability})
        res.json({data: updatedProduct})
}

export const deleteProduct = async (req: Request, res: Response) => {

        const { id } = req.params
        const product = await Product.findByPk(id)
        if(!product) {
            return res.status(404).json({error: "No se ha encontrado el producto"})
        }
        const deleted = product.destroy()
        res.json({data: deleted})
}