const path = require("path")
var fs = require('fs');
const ProductService = require('./services/products.services')

var data = fs.readFileSync(path.join(__dirname, './input.csv')).toString().split('\n')
    .map((e: any) => e.trim()).join('\n')


ProductService().processCSV(data).then(()=>{
    console.log("Complete")
    process.exit()
})