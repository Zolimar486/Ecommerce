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


        },

        clearCart: (state) => {
            state.quantity = 0;
            state.products=[];
            state.total= 0;
        }
    }
})

export const {addProduct, clearCart } = cartSlice.actions

export default cartSlice.reducer; // we export default the cartSlice like this, since its going to be used in Store
