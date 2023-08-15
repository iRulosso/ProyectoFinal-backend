import mongoose from "mongoose";

export const connectionString = 'mongodb+srv://rschulmeister:Ramiro11221@ecomerce.uuy9zqa.mongodb.net/?retryWrites=true&w=majority';

//export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.log(error);
    }
//}