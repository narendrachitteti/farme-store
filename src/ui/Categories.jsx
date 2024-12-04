import React, { useEffect, useState } from "react";
import Container from "./Container";
import { getData } from "../lib/index";
import Title from "./Title";
import { Link } from "react-router-dom";
import BASE_URL from "../Helper/Helper";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Track screen size

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${BASE_URL}/subcategory/get-sub-category`;
      try {
        setLoading(true);
        const data = await getData(endpoint);

        // Check for "Combo Offers" and reorder categories
        const reorderedCategories = reorderCategories(data);
        setCategories(reorderedCategories);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // Resize listener to dynamically adjust the number of displayed categories
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const reorderCategories = (data) => {
    // Find the category with "Combo Offers"
    const comboOfferCategory = data.find((item) =>
      item.title.trim().toLowerCase().startsWith("combo offers")
    );

    if (comboOfferCategory) {
      // Exclude the found category and prepend it to the array
      const filteredCategories = data.filter(
        (item) => item._id !== comboOfferCategory._id
      );
      return [comboOfferCategory, ...filteredCategories];
    }
    return data; // If no "Combo Offers" category is found, return original order
  };

  // Limit categories to 9 on mobile, show all on larger screens
  const displayedCategories = isMobile ? categories.slice(0, 9) : categories;

  return (
    <Container>
      <div className="w-full p-5 border rounded-md relative">
        {/* Centered Title and Right-Aligned "View All" */}
        <div className="flex justify-center items-center relative mb-4">
          <Title
            text="Shop by Categories"
            className="text-lg md:text-xl underline"
          />
          <Link
            to="/categories"
            className="absolute right-0 text-sm md:text-base font-semibold text-blue-600 hover:underline"
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
          <div className="grid grid-cols-3 md:grid-cols-8 gap-5">
            {displayedCategories.map((item) => (
              <Link
                to={`/category/${item.category_id}/subcategory/${item._id}/products`}
                key={item._id}
                className="flex flex-col items-center text-center"
              >
                <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Title with word wrapping */}
                <p className="mt-2 text-sm font-medium text-gray-700 break-words w-28">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Categories;
