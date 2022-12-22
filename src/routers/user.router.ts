import {Router} from 'express';
import {sample_users} from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';
const router = Router();

router.get('/seed',asyncHandler(
    async (req,res)=>{
        const usersCount = await UserModel.countDocuments();
        if(usersCount>0){
            res.send("Seed is already done!");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed Is Done!");
    }
)); 

router.post('/login',asyncHandler(
    async (req,res)=>{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))) {
            console.log("im fine")
            res.send(generateTokenResponse(user));
            console.log("im fine")
        }else {
            res.status(400).send("Email or password is not valid!")
        }
    }
))

// router.post('/login',(req,res)=>{
//     const {email,password} = req.body;
//     const user = sample_users.find(user => user.email === email &&
//          user.password === password);
//     if(user) {
//         res.send(generateTokenResponse(user));

//     }else {
//         res.status(400).send("User name or password is not valid!")
//     }
// })

router.post('/register', asyncHandler(
    async (req,res)=>{
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(400).send('User is already exist, please login !');
            return;
        }

        const encryptedPassword = await bcrypt.hash(password,10);
        const newUser:User = {
            id:'',
            name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            address,
            isAdmin:false
        }
        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser))
    }
))


const generateTokenResponse = (user:any)=>{
    const token = jwt.sign({
        email:user.email,isAdmin:user.isAdmin
    },"SomeRandomText",{
        expiresIn:"30d"
    })
    user.token = token;
    return user;
}

export default router;