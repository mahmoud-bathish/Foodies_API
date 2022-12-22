import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import { dbconnect } from "./configs/database.config";
dbconnect();


const app = express();
// app.use(cors({
//     credentials:true,
//     origin:['http:localhost:4200']
// }));
app.use(cors())
app.use(express.json())
app.use("/api/foods",foodRouter);
app.use("/api/users",userRouter);



const port = 5000;
app.listen(port,()=>{
    console.log("server listen in http://localhost:" + port)
})


