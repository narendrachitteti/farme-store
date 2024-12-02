import React from "react";
import "react-multi-carousel/lib/styles.css";
import HomeBanner from "./ui/HomeBanner";
import Categories from "./ui/Categories";
import ProductList from "./ui/ProductList";
// import Blog from "./ui/Blog";
import BrandSection from "./ui/BrandSection";
// import BenefitsSection from "./ui/BenefitsSection";
import CropDiagnosis from "./ui/CropDiagnosis";
// import StatsSection from "./ui/StatsSection";
import CropsSection from "./ui/Crops";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExclusiveDeals from "./ui/ExclusiveDeals";

function App() {
  return (
    <main>
      <ToastContainer />
      <HomeBanner />
      <ExclusiveDeals/>
      <Categories />
      <CropDiagnosis/>
      <BrandSection/>
      <CropsSection/>
      {/* <ExclusiveGallery /> */}
      {/* <BenefitsSection/> */}
      <ProductList />
      {/* <StatsSection/> */}
      <br/>

      {/* <Blog /> */}
    </main>
  );
}

export default App;
