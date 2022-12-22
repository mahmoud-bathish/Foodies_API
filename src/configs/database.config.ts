import {connect, ConnectOptions} from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const dbconnect = ()=> {
    connect(process.env.MONGO_URI!,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
        () => console.log("connect successfully"),
        (error) => console.log(error)
    )
}