import styled from 'styled-components'
import { mobile } from '../Responsive'
import {Badge} from '@material-ui/core'
import { Search, ShoppingCartOutlined} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import {Link}  from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { logout } from '../Redux/userRedux';


const Container = styled.div`

  height:60px;
  ${mobile({height:"50px"})};

`
const Wrapper = styled.div`
  padding:10px 20px;
  display:flex;
  justify-content: space-between;
  align-items:center;
  ${mobile({padding:"10px 0px"})}
`

const Left = styled.div`
 flex:1;
 display:flex;
 align-items:center;



`
const Language = styled.span`
   font-size:14px;
   cursor:pointer;
   ${mobile({display:"none"})}
`

const SearchContainer= styled.div`
 border:0.5px solid lightgray;
 display:flex;
 align-items:center;
 margin-left:25px;
 padding:5px;
`

const Input = styled.input`
    border:none;
    ${mobile({width:"50px"})}
`

const Center = styled.div`
flex:1;
text-align:center;

`
const Logo = styled.h2`
 font-weight:bold;
`

const Right= styled.div`

flex:1;
display:flex;
align-items:center;
justify-content:flex-end;
${mobile({ flex: 2, justifyContent:"center"})}


`

const MenuItems= styled.div`
 font-size:14px;
 margin-left:25px;
 cursor:pointer;
 ${mobile({fontSize:"12px", marginLeft:"10px"})}
`

const List= styled.ul`
display:flex;
list-style:none;
`

const ListItems= styled.li`
margin:5px;
cursor:pointer;
`

const Image = styled.img`

width:25px;
heigth:25px;
border-radius:50%;
object-fit:cover;
`



export default function Navbar(){
    const quantity = useSelector(state=> state.cart.quantity);
    const currentUser = useSelector( state => state.user.currentUser)
    const dispatch = useDispatch()

    const handleLogout= ()=> {
      dispatch(logout())
    }
    
    return (
        <Container>
            <Wrapper>
                <Left>
                  <Language>EN</Language>
                  <SearchContainer>
                    <Input placeholder="Search"/>
                   <Search style={{fontSize:"16px", color:"gray"}} />
                  </SearchContainer>
                </Left>
                <Center>
                  <Logo>ZOLI.C</Logo>
                </Center>
                
                <Right>
                 {currentUser ? (
                  <>
                  <List>
                    <Link to ="/" style={{color:"black", textDecoration:"none"}} >
                    <ListItems>HOME</ListItems>
                    </Link>
                  </List>
                  <List>
                  <ListItems onClick={handleLogout}>
                    {currentUser && "LOGOUT"}
                  </ListItems>
                </List>
                  </>
                    )
                 :(
                  <List>
                <Link  to="/register" style ={{textDecoration:"none"}}>
                  <ListItems>SIGN UP</ListItems>
                  </Link>
                  <Link to="login">
                  <ListItems> SIGN IN </ListItems>
                  </Link>
                  </List>
                  )}
                  <Link to="/cart">
                  <MenuItems>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined/>

                  </Badge>
                  </MenuItems>
                  </Link>
                </Right>
            </Wrapper>
        </Container>

        
    )
}