import { CropDataType } from "./types";

// Helper function to extract the year from the "Year" field
function parseYear(yearString: string): number {
  const match = yearString.match(/\d{4}/);
  return match ? parseInt(match[0]) : 0;
}

// Function to get the crop with maximum and minimum production each year
export function getMaxMinProductionByYear(data: CropDataType[]) {
  // Object to hold production data by year
  const productionByYear: Record<
    number,
    {
      maxCrop: string;
      maxProduction: number;
      minCrop: string;
      minProduction: number;
    }
  > = {};

  // Iterate over each entry in the data
  data.forEach((entry) => {
    const year = parseYear(entry.Year);
    const crop = entry["Crop Name"];
    const production = entry["Crop Production (UOM:t(Tonnes))"];

    // Initialize year if it doesn't exist in productionByYear
    if (!productionByYear[year]) {
      productionByYear[year] = {
        maxCrop: crop,
        maxProduction: production,
        minCrop: crop,
        minProduction: production,
      };
    } else {
      // Update max and min production for the year
      if (production > productionByYear[year].maxProduction) {
        productionByYear[year].maxCrop = crop; // Update max crop
        productionByYear[year].maxProduction = production; // Update max production
      }
      if (production < productionByYear[year].minProduction) {
        productionByYear[year].minCrop = crop; // Update min crop
        productionByYear[year].minProduction = production; // Update min production
      }
    }
  });

  // Convert the result into an array
  const result = [];
  for (const year in productionByYear) {
    result.push({
      year: parseInt(year), // Convert year to integer
      maxCrop: productionByYear[parseInt(year)].maxCrop, // Get max crop for the year
      minCrop: productionByYear[parseInt(year)].minCrop, // Get min crop for the year
    });
  }
  return result; // Return the array of results
}

// Function to calculate average yield and area per crop
export function getAverageYieldAndArea(data: CropDataType[]) {
  // Create an array of unique crop names
  const averages = Array.from(new Set(data.map((entry) => entry["Crop Name"])));

  // Use map to calculate averages for each crop
  const results = averages.map((crop) => {
    // Filter data for the specific crop
    const cropData = data.filter((entry) => entry["Crop Name"] === crop);

    let totalYield = 0; // Initialize totalYield
    cropData.forEach((entry) => {
      totalYield +=
        parseFloat(
          String(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"])
        ) || 0; // Accumulate yield
    });

    let totalArea = 0; // Initialize totalArea
    cropData.forEach((entry) => {
      totalArea +=
        parseFloat(
          String(entry["Area Under Cultivation (UOM:Ha(Hectares))"])
        ) || 0; // Accumulate area
    });

    const Croplength = cropData.length; // Get the number of entries for the crop
    const avgYield = (totalYield / Croplength).toFixed(3); // Calculate average yield
    const avgArea = (totalArea / Croplength).toFixed(3); // Calculate average area

    // Return the calculated values for the crop
    return {
      crop,
      avgYield,
      avgArea,
      totalYield: Math.round(totalYield),
      totalArea: Math.round(totalArea),
      Croplength,
    };
  });

  return results; // Return the array of calculated averages
}
