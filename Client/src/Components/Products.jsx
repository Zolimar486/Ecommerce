import styled from 'styled-components'
import { popularProducts } from '../data'
import Product from './Product'
import {useState, useEffect} from 'react';
import axios from 'axios';



const Container = styled.div`
margin:10px auto;
max-width:400px;


@media only screen and (min-width:768px){
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  gap:10px;

  margin:0px;
  max-width:100%;
}
`

export default function Products({cat,filter,sort}){
  const [products, setProducts] = useState([]);  ///// Define the products
  const [filteredProduct, setFilteredProduct] = useState([]);   //// whenever its changed the filter products , its going to update this state

  useEffect (() => {   /////// when its changed the cat, its going to fire the useEffect function, just fetching products from our api
    const getProducts= async() => {
      try{
        const res = await axios.get(cat ?`https://ecommerce-qmhd.onrender.com/api/products?category=${cat}` :
        'https://ecommerce-qmhd.onrender.com/api/products');
       
        setProducts(res.data);

      }catch(err){
       
      }
    }
    getProducts();
  }, [cat]);

  useEffect(() => {  ////////whenever we change any filters, we are gonna set our filteredProducts
    cat && setFilteredProduct(
      products.filter(item => Object.entries(filter).every(([key,value]) =>
      item[key].includes(value)
      

      ))
    )
  },[products, cat, filter])

  useEffect(() => {
    if((sort==="newest")){
       
       setFilteredProduct((prev) =>
       [...prev].sort((a,b) => a.createdAt - b.createdAt)

       )
    }else if((sort==="asc")){
      setFilteredProduct((prev) =>
      [...prev].sort((a,b) => a.price - b.price)

      )
    }else{
      setFilteredProduct(prev =>
        [...prev].sort((a,b) => b.price- a.price)

      )
    }

  }, [sort])



    return(
      <Container>
        {cat ?filteredProduct.map((item)=> (
            <Product  item={item} key={item.id}/>
        )):products.slice(0,8).map((item)=> (
          <Product  item={item} key={item.id}/>
      ))}
      </Container>
    )
}