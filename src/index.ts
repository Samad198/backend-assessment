import express from 'express'
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
import productsRouter from './routes/products.routes';
import { Response, Request, NextFunction, Errback } from 'express'


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (_: Request, res: Response) => {
    res.status(200).send("Node.js, Express, and Postgres API")
})
app.use('/products', productsRouter);

app.listen(port, () => console.log(`Running on port ${port}`))