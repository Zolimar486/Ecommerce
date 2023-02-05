import styled from 'styled-components'
import { mobile } from '../Responsive'
import {useState} from 'react'
import { login } from '../Redux/apiCalls'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const Container = styled.div`
 width:100vw;
 height: 100vh;
 background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center;

    background-size:cover;
    display:flex;
    align-items:center;
    justify-content:center;


`

const Wrapper= styled.div`
 width:25%;
 background-color:white;
 padding:20px;
 ${mobile({width:"75%"})}
`

const Title= styled.h1`
 font-size:20px;
 font-weight:300;
 margin:10px 0px;
`

const Form= styled.form`
 
 display:flex;
 flex-direction:column;
`

const Input= styled.input`
 flex:1;
 min-width:40%;
 margin: 10px 0px;
 padding:10px;

`

const Error = styled.span`
color: red;
`

const Link1 = styled.a`
margin:5px  0px;
font-size:12px;
text-decoration:underline;
cursor:pointer;
`

const Button= styled.button`

width:40%;
padding:15px 20px;
background-color:teal;
cursor:pointer;
border:none;
margin-bottom:10px;
color:white;
&:disabled{
    color:green;
    cursor:not-allowed;
}
`



export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch= useDispatch();
    const {isFetching, error} = useSelector((state) => state.user)

    const handleClick = (e) => {
      e.preventDefault();
      login(dispatch, {username, password}); //this login process  is the same of  export const login = async(dispatch, user) from apiCalls.js

    };

    return(
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="Username" onChange={(e)=> setUsername(e.target.value)}/>
                    <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    
                    
                    <Button onClick={ handleClick} disabled ={isFetching} >LOGIN</Button>
                    { error && <Error>Something went wrong </Error>}
                    <Link1>DO NOT YOU REMEMBER YOUR PASSWORD</Link1>
                    <Link to='/register' style={{textDecoration:"none", color:"black"}}>
                    <Link1>CREATE A NEW ACCOUNT</Link1>
                    </Link>
                </Form>
            </Wrapper>
        </Container>
    )
}