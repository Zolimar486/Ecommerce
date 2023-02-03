import styled from 'styled-components';
import Announcement from '../Components/Announcement';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { mobile } from '../Responsive';
import {useSelector} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import {useState, useEffect} from 'react'
import {userRequest} from '../requestMethod';
import {useHistory} from 'react-router-dom'


const Container = styled.div``

const Wrapper = styled.div`
padding:20px;
${mobile({padding:"10px"})}
`

const Title = styled.h1`
 font-weight:300;
 text-align:center;
`

const Top = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding:20px;
`


const TopButton = styled.button`
 padding:10px;
 font-weight:300;
 cursor:pointer;
 border: ${props=> props.type === "filled" && "none"};
 background-color: ${props=> props.type === "filled" ? "black" : "transparent"};
 color: ${props=> props.type === "filled" && "white"};
`

const TopTexts = styled.div`
${mobile({display:"none"})}
`

const TopText = styled.span`
 text-decoration:underline;
 cursor:pointer;
 margin:0px 10px;
`

const Bottom = styled.div`
display:flex;
justify-content: space-between;
${mobile({flexDirection:"column"})}
`

const Info = styled.div`
flex:3;

`
const Product = styled.div`
display:flex;
justify-content:space-between;
${mobile({flexDirection:"column"})}

`

const ProductDetail = styled.div`
flex:2;
display:flex;
`

const Image = styled.img`
width:200px;
`


const Detail = styled.div`
display:flex;
flex-direction:column;
justify-content:space-around;

padding:20px;

`

const ProductName = styled.span``

const ProductId = styled.span``

const Color = styled.div`
display:flex;

`

const ProductColor = styled.div`
 width:20px;
 height:20px;
 border-radius:50%;
 background-color: ${props=> props.color};
 margin:3px;
 
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
flex:1;
 display:flex;
 align-items:center;
 justify-content:center;
 flex-direction:column;
`

const ProductAmountContainer = styled.div`
  margin-bottom:20px;
`

const Add = styled.span`

`

const Amount = styled.span`

font-size:24px;
margin: 5px;
${mobile({margin:"5px 15px" })}
`

const Remove = styled.span `

`

const ProductPrice = styled.div`
  font-size:30px;
  font-weight:200;
  ${mobile({marginBottom:"20px"})}
`

const Hr = styled.hr`
background-color:#eee;
border:none;
height:1px;
`




const Summary = styled.div`
flex:1;
border:0.5px solid lightgray;
border-radius:10px;
padding:20px;
height:50vh;

`

const SummaryTitle = styled.h2`
font-weight:200;
`

const SummaryItem = styled.div`
margin: 20px 0px;
display:flex;
justify-content:space-between;
font-weight: ${props=> props.type==="total" && "500"};
font-size: ${props=> props.type==="total" && "24px"};

`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
width:100%;
padding:10px;
background-color:black;
color:white;
cursor:pointer;
font-weight:600;
`

const KEY =process.env.REACT_APP_STRIPE;

export default function Cart(){
    const cart = useSelector(state => state.cart) // fetch data from our redux state, for using our product in our cart
    const [stripeToken, setStripeToken] = useState(null)
    const history = useHistory()
      
    const onToken = (token)=> {
        setStripeToken(token)

    }
    
    useEffect(()=> {
        const makeRequest = async() => {
            try{
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total *100,
                });
                history.push('/success', {
                    stripeData: res.data,
                    products: cart,
                })
            }catch{}
        }
        stripeToken && makeRequest()

    },[stripeToken, cart.total, history, ])

    return(
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>Your Bag</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist(0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        { cart.products.map((product) => (
                            <Product>
                            <ProductDetail>
                                <Image src={product.img} />
                                <Detail>
                                    <ProductName><b>Product:</b>{product.title}</ProductName>
                                    <ProductId> <b>ID:</b> {product._id}</ProductId>
                                    <Color>
                                    <ProductColor color={product.color}/>
                                    
                                    </Color>
                                    <ProductSize><b>Size:</b> {product.size}</ProductSize>
                                </Detail>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Add style={{cursor:"pointer"}}>
                                    <i className="fa fa-plus" ></i>
                                    </Add>
                                    <Amount>{product.quantity}</Amount>
                                    <Remove style={{cursor:"pointer"}}>
                                    <i className="	fa fa-minus"></i>
                                    </Remove>

                                </ProductAmountContainer>
                                <ProductPrice> $ {product.price * product.quantity}</ProductPrice>
                            </PriceDetail>
                        </Product>
                        )) }

                        <Hr/>
                    
                        

                     </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    
                        <SummaryItem>
                        <SummaryItemText> Subtotal</SummaryItemText>
                        <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                        <SummaryItemText> Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$5.90</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                        <SummaryItemText> Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem type="total">
                        <SummaryItemText> total</SummaryItemText>
                        <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout

                        name="Fashion Shopping"
                        image="https://avatars.githubusercontent.com/u/1486366?s=120&v=4"
                        billingAddress
                        shippingAddress
                        description= {`your total is ${cart.total}`}
                        amount= {cart.total*100}
                        token={onToken}
                        stripeKey= {KEY}

                        >


                        <Button>CHECK OUT</Button>
                        </StripeCheckout>

                        
                        
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}