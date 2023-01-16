// import { LatLng } from 'leaflet';
import {model,Schema,Types} from 'mongoose';
import { OrderStatus } from '../constants/order_status';
import { Food, FoodSchema } from './food.model';
// import { OrderStatusEnum } from '../constants/order_status';
// import { Food,FoodSchema } from './Food';
export interface LatLng {
  lat:string;
  lng:string;
}

export const LatLngSchema = new Schema<LatLng>(
  {
    lat:{type:String,required:true},
    lng:{type:String,required:true}
  }
)

export interface OrderItem {
  food:Food;
  price:number;
  quantity:number;
}

export const OrderItemSchema = new Schema<OrderItem>(
  {
    food:{type:FoodSchema,require:true},
    price:{type:Number,require:true},
    quantity:{type:Number,require:true},
  }
)

export interface Order {
  id:number;
  items:OrderItem[];
  totalPrice:number;
  name:string;
  address:string;
  addressLatLng?:LatLng;
  status:OrderStatus;
  user:Types.ObjectId;
  createdAt:Date;
  updatedAt:Date;
}

const orderSchema = new Schema<Order>({
    name:{type:String,required:true},
    address:{type:String,required:true},
    addressLatLng:{type:LatLngSchema,required:true},
    totalPrice:{type:Number,required:true},
    items:{type:[OrderItemSchema],required:true},
    status:{type:String,default:OrderStatus.NEW},
    //user:{type:Schema.Types.ObjectId,required:true},
},{
    timestamps:true,
    toJSON:{ 
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
});

export const OrderModel = model('order',orderSchema);
