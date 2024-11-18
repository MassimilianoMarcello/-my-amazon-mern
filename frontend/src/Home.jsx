
import DiscountedProducts from './components/HomePage/DiscountedProducts';
import CategoryGrid from './components/Product/CategoryGrid';
import FeaturedProducts from './components/HomePage/FeaturedProducts';
import NewArrivals from './components/HomePage/NewArrivals ';
// import CustomerReviews from './components/HomePage/CustomerReviews';
import PromotionalBanner from './components/HomePage/PromotionalBanner';

// import NewsletterSignup from './components/HomePage/NewsletterSignup';
// import RecommendedProducts from './components/HomePage/RecommendedProducts';
// import PopularCategories from './components/HomePage/PopularCategories';
// import VideoPromotions from './components/HomePage/VideoPromotions';
// import DailyDeals from './components/HomePage/DailyDeals';
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
            {/* <CustomerReviews /> */}
      
            {/* <NewsletterSignup /> */}
            {/* <RecommendedProducts /> */}
            {/* <PopularCategories /> */}
            {/* <VideoPromotions /> */}
            {/* <DailyDeals /> */}
        </div>
    );
};

export default Home;