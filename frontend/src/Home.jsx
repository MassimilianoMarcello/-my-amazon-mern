
import DiscountedProducts from './components/HomePage/DiscountedProducts';
import CategoryGrid from './components/Product/CategoryGrid';
import FeaturedProducts from './components/HomePage/FeaturedProducts';
import NewArrivals from './components/HomePage/NewArrivals';

import PromotionalBanner from './components/HomePage/PromotionalBanner';

// import NewsletterSignup from './components/HomePage/NewsletterSignup';
import RecommendedProducts from './components/HomePage/RecommendedProducts';


import DailyDeals from './components/HomePage/DailyDeals';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <PromotionalBanner />
            <h1>Welcome to Our Store</h1>
            <DiscountedProducts />
            <CategoryGrid />
            <FeaturedProducts />
             <NewArrivals />
           
      
            {/* <NewsletterSignup /> */}
            <RecommendedProducts />
     
          
            <DailyDeals />
        </div>
    );
};

export default Home;