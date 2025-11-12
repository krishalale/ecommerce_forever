import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";

// global variables
const currecny = 'USD';
const deliveryCharge = 10;


// gatway initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Placeing order using COD Method

const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment:false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        
        await userModel.findByIdAndUpdate(userId, {cartData: []});
        res.json({success:true, message:"Order placed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error while placing order"});
    }
}

// Placeing order using Stripe Method

const placeOrderStripe = async (req, res) => {
    try {
       const {userId, items, amount, address} = req.body;
       const {origin} = req.headers;
       const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment:false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        
        const line_items = items.map((item)=>({
          price_data:{
            currency:currency,
            product_data:{
              name:item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity:item.quantity,
        }))

        line_items.push({
          price_data:{
            currency:currency,
            product_data:{
              name:"Delivery Charges",
            },
            unit_amount: deliveryCharge * 100,
          },
          quantity:1,
        })
        const session = await stripe.checkout.sessions.create({
          success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
          cancel_url: `${origin}/verify?canceled=true`,
          mode: 'payment',
          line_items,
        })

        res.json({success:true, session_url:session.url});
    } catch (error) {
      console.log(error);
      res.json({success:false, message:"Error while placing order"});
    }
}

// verify Stripe

const verifyStripe = async (req, res) => {
 const {orderId, success, userId} = req.body;

 try {
  if(success){
    await orderModel.findByIdAndUpdate(orderId, {payment:true});
    await userModel.findByIdAndUpdate(userId, {cartData: {}});
    res.json({success:true, message:"Payment verified successfully"});
  }else{
    await orderModel.findByIdAndDelete(orderId);
    res.json({success:false, message:"Payment failed, please try again"});
  }
 } catch (error) {
  console.log(error);
  res.json({success:false, message:"Error while placing order"});
 }
}

// verify Razorpay

const verifyRazorpay = async (req, res) => {
  try {
    const {orderId, razorpay_order_id} = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if(orderInfo.status === 'paid'){
      await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true});
      await userModel.findByIdAndUpdate(userId, {cartData: {}});
      res.json({success:true, message:"Payment verified successfully"});

    }else{
      res.json({success:false, message:"Payment not verified, please try again"});
    }
}
  catch (error) {
    console.log(error);
    res.json({success:false, message:"Error while placing order"});
  }
}

// Placeing order using Razorpay Method

const placeOrderRazorpay = async (req, res) => {
    try {
      const {userId, items, amount, address} = req.body;
       
       const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment:false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
          amount: amount * 100,
          currency: currecny.toUpperCase(),
          receipt: newOrder._id.toString(),
        };

        await razorpay.orders.create(options, (err, order) => {
          if(err){
            console.log(err);
            res.json({success:false, message:"Error while placing order"});
          }
          res.json({success:true, order});
        });
    } catch (error) {
      console.log(error);
      res.json({success:false, message:"Error while placing order"});
    }
}

// All Orders data for admin 

const allOrders = async (req, res) => {
  try{
    const {userId} = req.body;
    const orders = await orderModel.find({userId});
    res.json({success:true, orders});
  }catch(error){
    console.log(error);
    res.json({success:false, message:"Error while fetching all orders"});
  }
}

// User specific orders data

const userOrders = async (req, res) => {
 try {
    const {userId} = req.body;
    const orders = await orderModel.find({userId})
    res.json({success:true, orders});
 } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error while fetching user orders"});
 }
}

// Update order status

const updateStatus = async (req, res) => {
   try {
    const {orderId, status} = req.body;
    await orderModel.findByIdAndUpdate(orderId, {status});
    res.json({success:true, message:"Order status updated successfully"});
   } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error while fetching user orders"});
   }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe, verifyRazorpay};