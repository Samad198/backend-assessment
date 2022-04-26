const path = require("path")
var fs = require('fs');
import { Product } from '../../../ts/types'
var data = fs.readFileSync(path.join(__dirname, './example.csv')).toString().split('\n')
    .map((e: any) => e.trim()).join('\n')

const ProductService = require('../../../services/products.services')
class ProductModel {
    find() { return { lean: () => this.productList } };
    async create(input: Product) { this.productList.push(input) };
    productList: Product[] = []
    constructor() {
    }
}

describe("Product service tests", () => {
    test('Correct output when correct input is passed', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const mockProductModel = new ProductModel()
        await ProductService(mockProductModel).processCSV(data)

        // check that products would be stored in the database given the model was working correctly
        expect(mockProductModel.productList).toStrictEqual(
            [
                { sku: '4', colour: 'C1', size: 'S4' },
                { sku: '5', colour: 'C1', size: 'S5' },
                { sku: '6', colour: 'C1', size: 'S6' },
                { sku: '7', colour: 'C1', size: 'S7' },
                { sku: '8', colour: 'C1', size: 'S8' },
                { sku: '9', colour: 'C1', size: 'S9' }
            ])

        // check for the correct output on first run
        expect(consoleSpy).toHaveBeenCalledWith('row 1 was skipped as there are multiple products with the same sku');
        expect(consoleSpy).toHaveBeenCalledWith('row 2 was skipped as there are multiple products with the same sku');
        expect(consoleSpy).toHaveBeenCalledWith('row 3 was skipped as a field was missing');
        expect(consoleSpy).toHaveBeenCalledWith('row 4 was skipped as a field was missing');
        expect(consoleSpy).toHaveBeenCalledWith('4 rows skipped');
        expect(consoleSpy).toHaveBeenCalledWith('6 products created');
        expect(consoleSpy).toHaveBeenCalledWith('0 products unchanged');
        consoleSpy.mockClear()

        // check that there is a different output on second run
        await ProductService(mockProductModel).processCSV(data)
        expect(consoleSpy).toHaveBeenCalledWith('row 1 was skipped as there are multiple products with the same sku');
        expect(consoleSpy).toHaveBeenCalledWith('row 2 was skipped as there are multiple products with the same sku');
        expect(consoleSpy).toHaveBeenCalledWith('row 3 was skipped as a field was missing');
        expect(consoleSpy).toHaveBeenCalledWith('row 4 was skipped as a field was missing');
        expect(consoleSpy).toHaveBeenCalledWith('4 rows skipped');
        expect(consoleSpy).toHaveBeenCalledWith('0 products created');
        expect(consoleSpy).toHaveBeenCalledWith('6 products unchanged');

    });
    test('Test that invalid inputs return errors', async () => {
        const mockProductModel = new ProductModel()
        let badData = "ID,Colour,Size 1,C1,S1 1,C1,S1 2,C1, 3,,S3 4,C1,S4 5,C1,S5 6,C1,S6 7,C1,S7 8,C1,S8 9,C1,S9"
        try {
            await ProductService(mockProductModel).processCSV(badData)
        }
        catch (e) {
            expect(e).toEqual("Invalid input: Incorrect format");
        }
        badData = "SKU,Colour,Size"
        try {
            await ProductService(mockProductModel).processCSV(badData)
        }
        catch (e) {
            expect(e).toEqual("Invalid input: No data to process");
        }
        badData = "SKU,Colour,Size\n1,C2,S2,ES\n1,C1,S1"
        try {
            await ProductService(mockProductModel).processCSV(badData)
        }
        catch (e) {
            expect(e).toEqual("Invalid input: Incorrect format");
        }
    })
})




