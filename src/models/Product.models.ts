import {mongoose} from '../configs/mongoose'

const db = mongoose
const ProductSchema = new db.Schema(
	{
		sku: { type: String, required: true,unique: true },
		colour: { type: String, required: true },
		size: { type: String, required: true },
	},
	{ collection: 'products' }
)

const model = db.model('Product', ProductSchema)
export  {model}