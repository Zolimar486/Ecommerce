import styled from 'styled-components';
import Announcement from '../Components/Announcement';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import Newsletters from '../Components/Newsletters';
import Products from '../Components/Products';
import { mobile } from '../Responsive';
import {useLocation} from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div``

const Title = styled.h1`
margin:20px;
`

const FilterContainer = styled.div`
display:flex;
justify-content:space-between;
`

const Filter = styled.div`
margin:20px;
${mobile({width:"0px 20px", display:"flex", flexDirection:"column"})}
`

const FilterText = styled.span`
  font-size:20px;
  font-weight:600;
  margin-right:20px;
  ${mobile({marginBottom:"10px"})}
`

const Select = styled.select`
 padding:10px;
 padding-bottom:10px;
 margin-right:20px;
 ${mobile({margin:"10px 0px"})}
`

const Option = styled.option`
`


export default function ProductList(){

    const location = useLocation();
    const cat=location.pathname.split("/")[2]  /// To locate the Category items, women, coat, jeans

    const [filter, setFilter] = useState({})
    const [sort , setSort] = useState("newest")

    const handleFilter =(e) => {
        const value = e.target.value;
        setFilter({
            ...filter,    ////// to update color and size in the same object
            [e.target.name] : value,
        });

    }

    

    return(
        <Container>
            <Navbar/>
            <Announcement/>
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Product:</FilterText>
                    <Select name="color" onChange={handleFilter}>
                        <Option disabled >
                           Color
                        </Option>
                        <Option>White</Option>
                        <Option>Brown</Option>
                        <Option>Green</Option>
                        <Option>Black</Option>
                        <Option>Blue</Option>
                        <Option>Orange</Option>
                    </Select>
                    <Select name="size" onChange={handleFilter}>
                        <Option disabled selected >
                            Size
                        </Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                        <Option>XXL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Product</FilterText>
                    <Select onChange={e => setSort(e.target.value)}>
                        <Option value="newest"> Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price(desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat ={cat} filter={filter} sort={sort}/>
            <Newsletters/>
            <Footer/>
        </Container>
    )
}