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
                // get all products currently in the database
                const savedProducts: Product[] = await Product.find({}).lean()
                // initialise counts for summary
                let skipCount = 0
                let unchangedCount = 0
                let createdCount = 0
                // create a list of promises to store create requests
                const promises: Promise<unknown>[] = []
                // loop through all rows and create new products for each valid row
                products.map(async (product, index) => {
                    const productArray = product.split(",")
                    const sku = productArray[0]
                    const colour = productArray[1]
                    const size = productArray[2]
                    // skip if there is a row missing
                    if (sku === "" || colour === "" || size === "") {
                        skipCount++
                        console.log(`row ${index + 1} was skipped as a field was missing`)
                    }
                    // skip if row contains duplicate sku
                    else if (products.map(item => item.split(",")[0]).filter(itemSku => itemSku === sku).length > 1) {
                        skipCount++
                        console.log(`row ${index + 1} was skipped as there are multiple products with the same sku`)
                    }
                    else {
                        //check if product is already in the database. If so then it's unchanged. Otherwise, the product gets created
                        if (savedProducts.find(item => item.sku === sku)) {
                            unchangedCount++
                        }
                        else {
                            promises.push(Product.create({ sku, colour, size }))
                            createdCount++
                        }
                    }
                })
                // wait for any promises to complete then output
                await Promise.all(promises)
                console.log(`Summary:`)
                console.log(`${skipCount} rows skipped`)
                console.log(`${createdCount} products created`)
                console.log(`${unchangedCount} products unchanged`)
                return

            }
            catch (error) {
                throw error
            }
        },
        async getProducts({colour,size}:{colour:string,size:string}):Promise<Product[]> {
            try {
                const searchParams:{colour?:string,size?:string} = {}
                if(colour)searchParams.colour = colour
                if(size)searchParams.size = size
                const savedProducts = await Product.find(searchParams).lean()
                return savedProducts
            }
            catch (error) {
                throw error
            }

        }

    }
}
module.exports = ProductsService