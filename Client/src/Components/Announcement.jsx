import styled from 'styled-components'


const Container = styled.div`
  height:30px;
  background-color:lightCoral;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:500;
  font-size:14px;

  
  

`



export default function Announcement(){
    return(
        <Container>
         Super Deal! Free shipping on orders over $50
        </Container>
    )
}