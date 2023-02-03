import Navbar from '../Components/Navbar.jsx';

import Announcement from '../Components/Announcement.jsx';
import Slider from '../Components/Slider.jsx';
import Categories from '../Components/Categories.jsx';
import Products from '../Components/Products.jsx';
import Newsletters from '../Components/Newsletters.jsx';
import Footer from '../Components/Footer.jsx';







export default function Home(){
    return(
        <div className="home">
            <Announcement/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Products/>
            <Newsletters/>
            <Footer/>
            
        </div>
    )
}