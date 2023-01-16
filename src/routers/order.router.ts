import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { OrderStatus } from '../constants/order_status';
import { OrderModel } from '../models/order.model';
// import auth from '../middlewares/auth.mid'

const router = Router();
// router.use(auth);
router.post('/create',
asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;
    console.log(req.body)
    if(requestOrder.items.length <= 0){
        res.status(400).send('Cart Is Empty!');
        return;
    }

    await OrderModel.deleteOne({
        id: req.body.id,
        status: OrderStatus.NEW
    });

    const newOrder = new OrderModel({...requestOrder});
    await newOrder.save();
    res.send(newOrder);
})
)

router.get('/track/:id',asyncHandler(
async (req:any,res:any)=>{
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}
))

export default router;