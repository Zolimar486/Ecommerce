import styled  from 'styled-components';
import Announcement from '../Components/Announcement';
import Navbar from '../Components/Navbar';
import Newsletters from '../Components/Newsletters';
import Footer from '../Components/Footer';
import { mobile } from '../Responsive';
import {useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { publicRequest } from '../requestMethod';
import {Add, Remove} from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import {addProduct} from '../Redux/cartRedux'


const Container= styled.div``


const Wrapper = styled.div`
 display:flex;
 padding:50px;
 ${mobile({padding:"10px", flexDirection:"column"})}


`

const ImageContainer = styled.div`
 flex:1;
`

const Image= styled.img`
 width:100%;
 height:90vh;
 object-fit:cover;
 ${mobile({height:"40vh"})}
`

const InfoContainer = styled.div`

 flex:1;
 padding: 0px 50px;
 ${mobile({padding:"0px 10px"})}
`

const Title = styled.h2`
font-weight:200;
`

const Desc= styled.p`
margin:20px 0px;`

const Price= styled.span`
font-weight:100;
font-size:40px;
`

const FilterContainer = styled.div`
display:flex;
justify-content:space-between;
width:58%;
margin:30px 0px;
${mobile({width:"100%"})}
`

const Filter = styled.div`
  display:flex;
  align-items:center;
`

const FilterText= styled.span`
  font-size:20px;
  font-weight:200;
  
`

const FilterColor= styled.div`
 width:20px;
 height:20px;
 border-radius:50%;
 background-color: ${props => props.color};
 margin:0px 5px;
 cursor:pointer;
`

const FilterSize= styled.select`
 margin-left:5px;
 padding:5px;
`

const FilterSizeOption= styled.option``

const AddContainer = styled.div`
 display:flex;
 align-items:center;
 justify-content:space-between;
 width:50%;
 ${mobile({width:"100%"})}

`

const AmountContainer = styled.div`
 
 font-weight:700;
 display:flex;
 align-items:center;
`


const Amount= styled.span`
  width:30px;
  height:30px;
  border-radius:10px;
  border:1px solid coral;
  display:flex;
  align-items:center;
  justify-content:center;
  margin:0px 5px;
`

const Button= styled.button`
  padding:15px;
  border:2px solid coral;
  background-color:white;
  cursor:pointer;
  font-weight:500;

  &:hover{
    background-color:#FFEFD5;
  }

`




export default function Product(){
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
      const getProduct= async ()=> {
       try{
        const res= await publicRequest.get('/products/find/' + id);
        setProduct(res.data);

       }catch{}
      } 

      getProduct();
    },[id])

    const handleQuantity = (type)=> {
       if(type==="desc"){
        quantity > 1 && setQuantity(quantity -1)
       }else{
        setQuantity(quantity +1);
       }
    }

    const handleClick = () => {
     dispatch (addProduct({ ...product, quantity, color, size }))
    }


    return(
        <Container>
           <Navbar/>
           <Announcement/>
           <Wrapper>
            <ImageContainer>
                <Image src={product.img}/>
            </ImageContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.</Desc>
            <Price>{product.price}</Price>
            <FilterContainer>
                <Filter>
                    <FilterText> Color</FilterText>
                    {product.color?.map((c) => (
                        <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                    ))}
                    
                    
                </Filter>
                <Filter>
                    <FilterText>Size</FilterText>
                    <FilterSize onChange={(e) => setSize(e.target.value)}>
                        {product.size?.map((s) => (
                             <FilterSizeOption key={s}>{s}</FilterSizeOption>
                        ))}
                       
                        
                    </FilterSize>
                
                </Filter>
            </FilterContainer>
            <AddContainer>
                <AmountContainer>
                    <Remove style={{cursor:"pointer"}} onClick={()=> handleQuantity("desc")}/>
                        
                
                    <Amount>{quantity}</Amount>
                    <Add style={{cursor:"pointer"}}  onClick={()=> handleQuantity("inc")} />
                        
                  
                
                </AmountContainer>
                <Button onClick={() => handleClick()}>ADD TO CART</Button>
            </AddContainer>
            </InfoContainer>

           </Wrapper>
           <Newsletters/>
           <Footer/>
           
           
        </Container>
    )
}