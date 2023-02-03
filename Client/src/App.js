import Cart from './Pages/Cart.jsx';
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx';
import Product from './Pages/Product.jsx';
import ProductList from './Pages/ProductList.jsx';
import Register from './Pages/Register.jsx';

import Success from './Pages/Success.jsx';
import {BrowserRouter as Router, Route, Redirect,Switch} from 'react-router-dom'
import {useSelector} from 'react-redux'


    
function App() {
   const user = useSelector((state) => state.user.currentUser)

  return (
       <Router>
        <Switch>
          <Route exact path="/">
            <Home/>

          </Route>
          <Route path="/products/:category">
            <ProductList/>

          </Route>
          <Route path="/product/:id">
            <Product/>

          </Route>
          <Route path="/cart">
            <Cart/>
          </Route>
          <Route path ="/success">
            <Success/>

          </Route>

          <Route path="/login">
          {user ?  <Redirect to="/" /> :<Login/>}
         
          </Route>

          <Route path="/register" >
            {user ? <Home/> : <Register/>}
            
          </Route>

        </Switch>
       </Router>
        
    );
}

export default App;