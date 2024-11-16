import DiscountedProducts from "./components/HomePage/DiscountedProducts"
import CategoryGrid from "./components/Product/CategoryGrid"
// import CategoryProducts from "./components/Product/CategoryProducts"


const Home = () => {
  return (
    <div>
        {/* <CategoryProducts/> */}
        <DiscountedProducts/>
        <CategoryGrid/>
    </div>
  )
}

export default Home