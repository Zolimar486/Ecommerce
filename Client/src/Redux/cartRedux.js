import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:"cart",
    initialState :{   // our cartReducer, this initial state is going to be inserted into our navbar, to refleted in the shopping cart
        products:[],
        quantity:0,
        total:0,
    },
    reducers :{
        addProduct : (state, action) => { /// action meaning send something(product)
            state.quantity += 1; // increase the quantity of items(products) in the shopping cart
            state.products.push(action.payload);  // update our products,  this payload  is basically our new product
            state.total +=  action.payload.price *action.payload.quantity  /// the calculation of the quantity of the shopping cart


        }
    }
})

export const {addProduct} = cartSlice.actions

export default cartSlice.reducer; // we export default the cartSlice like this, since its going to be used in Store
