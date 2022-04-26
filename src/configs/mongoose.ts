require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1aleo.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`, {
	}).catch((err:unknown)=>console.log(err))
export const getConnection = () =>{	
	return mongoose
}

export const closeConnection = async ()=>{
	// Todo
}



export {mongoose}