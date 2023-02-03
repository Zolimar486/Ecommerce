import styled from 'styled-components'
import { categories } from '../data'
import CategoryItems from './CategoryItems'
import { mobile } from '../Responsive'



const Container = styled.div`
display:flex;
padding:20px;
justify-content:space-between;
${mobile({flexDirection:"column", padding:"10px"})}

`

export default function Categories(){
    return(
        <Container>
         {categories.map((item) => (
             <CategoryItems item={item} key={item.id} />
         ))}
            
        </Container>
    )
}