// import React, { useEffect, useState } from "react";
// import Container from "./Container";
// import { getData } from "../lib";
// import Title from "./Title";
// import { Link } from "react-router-dom";
// import { CategoryProps } from "../../type";
// import Banana from "../assets/brands/banana.png";
// import Cauliflower from "../assets/brands/cauliflower.png";
// import mango from "../assets/brands/mango1.png";
// import pomegranate from "../assets/brands/pomegranate.png";
// import pumpkin from "../assets/brands/pumpkin.png";
// import rose from "../assets/brands/rose.png";
// import tomato from "../assets/brands/tomato.png";

// const CategoriesAndCrops = () => {
//   const [categories, setCategories] = useState<CategoryProps[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const endpoint =
//         "`${BASE_URL}/category/get-category";
//       try {
//         const data = await getData(endpoint);
//         setCategories(data);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const crops = [
//     { name: "Banana", imagePath: Banana },
//     { name: "Cauliflower", imagePath: Cauliflower },
//     { name: "Mango", imagePath: mango },
//     { name: "Pomegranate", imagePath: pomegranate },
//     { name: "Pumpkin", imagePath: pumpkin },
//     { name: "Rose", imagePath: rose },
//     { name: "Tomato", imagePath: tomato },
//   ];

//   // Sort categories and crops alphabetically
//   const sortedCategories = [...categories].sort((a, b) => a.title.localeCompare(b.title));
//   const sortedCrops = [...crops].sort((a, b) => a.name.localeCompare(b.name));

//   return (
//     <Container>
//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* Categories Section */}
//         <div className="w-full lg:w-1/2 p-5 border rounded-md">
//           <u>
//             <Title text="Shop by categories" className="text-lg md:text-xl" />
//           </u>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
//             {sortedCategories.slice(0, 7).map((item: CategoryProps) => (
//               <Link
//                 to={`/category/${item._id}/subcategory`} // Link to the subcategory route
//                 key={item._id}
//                 className="flex flex-col items-center text-center"
//               >
//                 <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <p className="mt-2 text-sm font-bold">{item.title}</p>
//               </Link>
//             ))}
//             <Link
//               to="/categories" // Update the link to point to the new AllCategories component route
//               className="flex flex-col items-center text-center"
//             >
//               <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
//                 <p className="text-sm font-bold">View More</p>
//               </div>
//             </Link>
//           </div>
//         </div>

//         {/* Shop by Crops Section */}
//         <div className="w-full lg:w-1/2 p-5 border rounded-md">
//           <u>
//             <Title text="Shop by Crops" className="text-lg md:text-xl" />
//           </u>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
//             {sortedCrops.slice(0, 7).map((crop, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center text-center"
//               >
//                 <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
//                   <img
//                     src={crop.imagePath}
//                     alt={crop.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <p className="mt-2 text-sm font-bold">{crop.name}</p>
//               </div>
//             ))}
//             <Link
//               to="/crops"
//               className="flex flex-col items-center text-center"
//             >
//               <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
//                 <p className="text-sm font-bold">View More</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default CategoriesAndCrops;
// import React, { useEffect, useState } from "react";
// import Container from "./Container";
// import { getData } from "../lib";
// import Title from "./Title";
// import { Link } from "react-router-dom";
// import { CategoryProps } from "../../type";

// const Categories = () => {
//   const [categories, setCategories] = useState<CategoryProps[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const endpoint =
//         "`${BASE_URL}/category/get-category";
//       try {
//         const data = await getData(endpoint);
//         setCategories(data);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Sort categories alphabetically
//   const sortedCategories = [...categories].sort((a, b) => a.title.localeCompare(b.title));

//   return (
//     <Container>
//       <div className="w-full p-5 border rounded-md relative">
//         {/* Title and "View All" button */}
//         <div className="flex justify-between items-center mb-4">
//           <Title text="Shop by Categories" className="text-lg md:text-xl underline" />
//           <Link
//             to="/categories"
//             className="text-sm md:text-base font-semibold text-blue-600 hover:underline"
//           >
//             View All
//           </Link>
//         </div>

//         {/* Categories Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
//           {sortedCategories.map((item: CategoryProps) => (
//             <Link
//               to={`/category/${item._id}/subcategory`} // Link to the subcategory route
//               key={item._id}
//               className="flex flex-col items-center text-center"
//             >
//               <div className="w-20 h-20 bg-gray-200 border-gray-300 rounded-full overflow-hidden">
//                 <img
//                   src={item.imageUrl}
//                   alt={item.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="mt-2 text-sm font-bold">{item.title}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Categories;
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { getData } from "../lib/index";
import Title from "./Title";
import { Link } from "react-router-dom";
import BASE_URL from "../Helper/Helper";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint =
        `${BASE_URL}/category/get-category`;
      try {
        setLoading(true); // Set loading state to true before fetching data
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Set loading state to false after data is fetched
      }
    };
    fetchData();
  }, []);

  // Sort categories alphabetically
  const sortedCategories = [...categories].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Container>
      <div className="w-full p-5 border rounded-md relative">
        {/* Title and "View All" button */}
        <div className="flex justify-between items-center mb-4">
          <Title text="Shop by Categories" className="text-lg md:text-xl underline" />
          <Link
            to="/categories"
            className="text-sm md:text-base font-semibold text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg font-medium">Processing...</p>
          </div>
        ) : (
          /* Categories Grid */
          <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
            {sortedCategories.map((item) => (
              <Link
                to={`/category/${item._id}/subcategory`} // Link to the subcategory route
                key={item._id}
                className="flex flex-col items-center text-center"
              >
                <div className="w-28 h-28 bg-gray-200 border-gray-300 rounded-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm font-bold">{item.title}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Categories;
