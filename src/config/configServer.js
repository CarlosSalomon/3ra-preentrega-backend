import mongoose from "mongoose";
import {options} from '../config/config.js';



const URL = options.mongo.url;


const connectToDB = () => {
    try {
        mongoose.connect(URL)
        console.log('connected to DB')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB