import { Product } from '../ts/types'
const ProductsService = (Product=require('../models/Product.models').model) => {
    return {
        async processCSV(csv: string):Promise<void> {
            try {
                const lines = csv.split("\n")
                const products = lines.filter((item, index) => index !== 0)
                // check that it's got the valid fields
                if (lines[0] !== "SKU,Colour,Size") {
                    throw "Invalid input: Incorrect format"
                }
                // check that there is data to process
                if (products.length === 0) {
                    throw "Invalid input: No data to process"
                }
                // check that the string is formatted correctly
                else if(products.map(item => item.split(",")).find(obj=>obj.length!==3)){
                    throw "Invalid input: Incorrect format"
                }
               
            }
            catch (error) {
                throw error
            }
        },

    }
}
module.exports = ProductsService