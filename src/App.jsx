import "react-multi-carousel/lib/styles.css";
import HomeBanner from "./ui/HomeBanner";
import Categories from "./ui/Categories";
import ProductList from "./ui/ProductList";
// import Blog from "./ui/Blog";
import BrandSection from "./ui/BrandSection";
import BenefitsSection from "./ui/BenefitsSection";
import ExclusiveGallery from "./ui/ExclusiveGallery";
import CropDiagnosis from "./ui/CropDiagnosis";
import StatsSection from "./ui/StatsSection";
import CropsSection from "./ui/Crops";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main>
      <ToastContainer />
      <HomeBanner />
      <Categories />
      <CropDiagnosis/>
      <BrandSection/>
      <CropsSection/>
      {/* <ExclusiveGallery /> */}
      <BenefitsSection/>
      <ProductList />
      <StatsSection/>
      <br/>

      {/* <Blog /> */}
    </main>
  );
}

export default App;
