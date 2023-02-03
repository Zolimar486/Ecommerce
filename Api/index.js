const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")

app.use(cors());
app.options("*", cors())

const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

const userRouter = require('../Api/routes/user');
const authRouter = require('../Api/routes/auth');
const productRouter= require('../Api/routes/product')
const cartRouter = require('../Api/routes/cart');
const orderRouter = require('../Api/routes/order')
const stripeRouter = require('../Api/routes/stripe')

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(()=> console.log('I finally made it up thank God, connecting my cruster with Node'))
.catch((err)=> console.log(err));

const PORT = 5000;

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter );
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter)
app.use("/api/checkout", stripeRouter)

app.get('/', async(req,res) => {
    res.status(200).json({message:"Hello from Server"})
})

app.listen(PORT, ()=> {
    
    console.log(`running server on port: http://localhost:${PORT}`)
} )