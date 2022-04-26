import { Response, Request, NextFunction } from 'express'
import { Product } from '../ts/types'


const ProductsController = (ProductsService = require('../services/products.services')()) => {
    return {
        async getProducts(req: Request, res: Response, next: NextFunction) {
            try {
                const {size, colour} = req.query
                const savedProducts:Product[] = await ProductsService.getProducts({size,colour})
                return res.status(200).json(savedProducts.map(item=>({sku:item.sku,colour:item.colour,size:item.size})))
               
            }
            catch (err) {
                next(err)
            }
        },

    }
}

module.exports = ProductsController