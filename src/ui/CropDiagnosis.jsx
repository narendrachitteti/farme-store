import React from "react";

// Import the images
import selectPlant from "../assets/tomato.png";
import findPest from "../assets/pests.png";
import getExact from "../assets/pesticide.png";
import arrowIcon from "../assets/right-chevron1.png";

const CropDiagnosis = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-green-300"> {/* Added mx-4 for extra spacing */}
      <h2 className="text-xl font-bold text-orange-500 mb-4">Crop Diagnosis</h2>
      <div className="w-full border-b-2 border-black-500 mb-4"></div>{" "}
      {/* Underline element */}
      <div className="flex items-center justify-between w-full overflow-x-auto">
        {/* Step 1 */}
        <div className="flex-1 flex flex-col items-center mx-2">
          <img
            src={selectPlant}
            alt="Select Plant/Crop"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-2"
          />
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 border-orange-500 text-orange-500 font-bold text-sm sm:text-base mb-2">
            1
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center">
            Select Plant/Crop
          </h3>
        </div>

        {/* Arrow 1 */}
        <div className="mx-1 flex-shrink-0">
          <img src={arrowIcon} alt="Arrow" className="w-20 h-20 sm:w-24 sm:h-24" />
        </div>

        {/* Step 2 */}
        <div className="flex-1 flex flex-col items-center mx-2">
          <img
            src={findPest}
            alt="Find Pest"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-2"
          />
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 border-orange-500 text-orange-500 font-bold text-sm sm:text-base mb-2">
            2
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center">
            Find Pest/Disease/Nutrient Deficiencies
          </h3>
        </div>

        {/* Arrow 2 */}
        <div className="mx-1 flex-shrink-0">
          <img src={arrowIcon} alt="Arrow" className="w-20 h-20 sm:w-24 sm:h-24" />
        </div>

        {/* Step 3 */}
        <div className="flex-1 flex flex-col items-center mx-2">
          <img
            src={getExact}
            alt="Get Exact"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-2"
          />
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 border-orange-500 text-orange-500 font-bold text-sm sm:text-base mb-2">
            3
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center">
            Get Exact Products & Recommendations
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CropDiagnosis;
