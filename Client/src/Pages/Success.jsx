import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {useEffect, useState} from 'react';
import { userRequest } from '../requestMethod';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'

const Div = styled.div`

`

const Box = styled.div`

border: 1px solid;
border-radius:6px;
background-color:lightcoral;
color:white;
width:50%;
height:100px;
display:flex;
flex-direction:column;
padding:20px;
align-items:center;
font-size:16px;
`

export default function Success(){
    const location = useLocation(); ///it was added all the stripe information to this component throught data: res.data 
    const data = location.state.stripeData;
    const cart = location.state.cart;
    const currentUser = useSelector((state) => state.user.currentUser);

    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const createOrder = async()=> {
            try{
                const res= await userRequest.post('/orders', {
                    userId: currentUser._id, ///based on the models structure
                    products: cart.products.map((item) => ({
                        productId: item._id,
                        quantity: item._quantity,
                    })),
                    amount: cart.total,
                    address: data.billing_details.address,
                });

               setOrderId(res.data._id)

            }catch{}
        };

        data && createOrder()



    },[cart,data,currentUser])

    console.log(orderId)
    return (
       
        <Div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
         
        }}
      >
        <Box>
        {orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Successfull. Your order is being prepared...`}
       <Link to="/"> <button style={{ padding: 10, marginTop: 20, cursor:"pointer", fontSize:"15px", width:"100%" }}>Go to Homepage</button></Link>
        </Box>
      </Div>
            
       )

}