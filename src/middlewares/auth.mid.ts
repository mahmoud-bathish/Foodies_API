// import { verify } from "jsonwebtoken";


// export default (req: any, res: any, next: any) => {
//     const token = req.headers.access_token as string;
//     if(!token){
//         // console.log(req.body)
//         return res.status(401).send();
//     } 
//     try {
//         const decodedUser = verify(token, 'SomeRandomText');
//         req.user = decodedUser;

//     } catch (error) {
//         res.status(401).send();
//     }

//     return next();
// }