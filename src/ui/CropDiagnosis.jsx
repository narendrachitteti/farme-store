import React from 'react';

// Import the images
import selectPlant from '../assets/tomatoplant.avif';
import findPest from '../assets/findpest.png';
import getExact from '../assets/pesticide.png';
import arrowIcon from '../assets/arrowicon.png';

const CropDiagnosis = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-orange-500 mb-4">Crop Diagnosis</h2>
      <div className="w-full border-b-2 border-black-500 mb-4"></div> {/* Underline element */}
      <div className="flex items-center justify-between w-full overflow-x-auto">
        {/* Step 1 */}
        <div className="flex-1 flex flex-col items-center mx-2">
          <img src={selectPlant} alt="Select Plant/Crop" className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-1" />
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center">Select Plant/Crop</h3>
        </div>

        {/* Arrow 1 */}
        <div className="mx-1 flex-shrink-0">
          <img src={arrowIcon} alt="Arrow" className="w-6 h-6 sm:w-6 sm:h-6" />
        </div>

        {/* Step 2 */}
        <div className="flex-1 flex flex-col items-center mx-2">
          <img src={findPest} alt="Find Pest/Disease/Nutrient Deficiencies" className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-1" />
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center">Find Pest/Disease/Nutrient Deficiencies</h3>
        </div>

        {/* Arrow 2 */}
        <div className="mx-1 flex-shrink-0">
          <img src={arrowIcon} alt="Arrow" className="w-6 h-6 sm:w-6 sm:h-6" />
        </div>

        {/* Step 3 */}
        <div className="flex-1 flex flex-col items-center mx-2">
          <img src={getExact} alt="Get Exact Products & Recommendations" className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-1" />
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center">Get Exact Products & Recommendations</h3>
        </div>
      </div>
    </div>
  );
};

export default CropDiagnosis;
