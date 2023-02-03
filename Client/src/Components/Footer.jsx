import styled from 'styled-components'
import { mobile } from '../Responsive'


const Container =styled.div`
 display:flex;
 ${mobile({flexDirection:"column"})}
`
const Left = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  padding:20px;
  
`

const Logo = styled.h2`
`

const Desc = styled.p`
 margin:20px 0px;
`

const SocialContainer = styled.div`
   display:flex;
`

const SocialIcon = styled.div`
  margin-left:20px;
  width:30px;
  height:30px;
  border-radius:50%;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  background-color: #${props=> props.color}

`
const Center = styled.div`
  flex:1;
  padding:20px;
  ${mobile({display:"none"})}
`

const Title = styled.h3`
margin-bottom:20px;
    
`

const List = styled.ul`
 list-style:none;
 margin:0;
 padding:0;
 display:flex;
 flex-wrap:wrap;

`

const ListItems = styled.li`
  width:50%;
  margin-bottom:10px;
  
`

const Right= styled.div`
  flex:1;
  padding:20px;
  ${mobile({backgroundColor:"#fff8f8"})}
`



const ContactItem = styled.div`
margin-bottom:20px;


`

const Payment = styled.img`
width:50%;
`



export  default function Footer(){
    return(
        <Container>
            <Left> 
             <Logo>Zoli Carmen.</Logo>
            <Desc>There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.</Desc>
          <SocialContainer>
            <SocialIcon color="3B5999" >
            <i className="fab fa-facebook-square"></i>
            </SocialIcon>
            <SocialIcon color="E4405F">
            <i className="fa fa-pinterest-square" ></i>
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <i className="fab fa-twitter-square"></i>
            </SocialIcon>
            
          </SocialContainer>
          </Left>
            <Center>
              <Title> Useful Links </Title>
              <List>
                <ListItems>Home</ListItems>
                <ListItems>Cart</ListItems>
                <ListItems>Man Fashion</ListItems>
                <ListItems>Woman Fashion</ListItems>
                <ListItems>Accessories</ListItems>
                <ListItems>My Account</ListItems>
                <ListItems>Order Tracking</ListItems>
                <ListItems> WishList</ListItems>
                <ListItems>WishList</ListItems>
                <ListItems>Terms</ListItems>
              </List>
            </Center>
            <Right>
              <Title>Contact</Title>
              <ContactItem>
                <i className="fas fa-map-marker-alt" style={{marginRight:"10px"}}></i>
                622 Dixie Path, South Tobinchester 98336
              </ContactItem>
              <ContactItem>
                <i className="	fas fa-phone" style={{marginRight:"10px"}}></i>
                +1 234 56 78
              </ContactItem>
              
              <ContactItem>
              <i className="fa fa-envelope-o" style={{marginRight:"10px"}}></i>
                Contact@lama.dev</ContactItem>
              <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    )
}