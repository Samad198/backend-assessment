const path = require("path")
var fs = require('fs');

const ProductService = require('../../../services/products.services')


describe("Product service tests", () => {
    test('Test that invalid inputs return errors', async () => {
        
        let badData = "ID,Colour,Size 1,C1,S1 1,C1,S1 2,C1, 3,,S3 4,C1,S4 5,C1,S5 6,C1,S6 7,C1,S7 8,C1,S8 9,C1,S9"
        try {
            await ProductService().processCSV(badData)
        }
        catch (e) {
            expect(e).toEqual("Invalid input: Incorrect format");
        }
        badData = "SKU,Colour,Size"
        try {
            await ProductService().processCSV(badData)
        }
        catch (e) {
            expect(e).toEqual("Invalid input: No data to process");
        }
        badData = "SKU,Colour,Size\n1,C2,S2,ES\n1,C1,S1"
        try {
            await ProductService().processCSV(badData)
        }
        catch (e) {
            expect(e).toEqual("Invalid input: Incorrect format");
        }
    })
})




