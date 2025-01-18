import { CropData } from "../interfaces";

export const processBarChartData = (
  data: CropData[]
): { crop: string; avgYield: number }[] => {
  const cropDataMap: Record<string, { totalYield: number; count: number }> = {};

  data.forEach((record) => {
    const yieldValue = record["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
      ? parseFloat(record["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] as string)
      : 0;

    if (!cropDataMap[record["Crop Name"]]) {
      cropDataMap[record["Crop Name"]] = { totalYield: 0, count: 0 };
    }

    cropDataMap[record["Crop Name"]].totalYield += yieldValue;
    cropDataMap[record["Crop Name"]].count += 1;
  });

  return Object.keys(cropDataMap).map((crop) => ({
    crop,
    avgYield: cropDataMap[crop].totalYield / cropDataMap[crop].count,
  }));
};

export const processTableData = (
  data: CropData[]
): { year: string; maxCrop: string; minCrop: string }[] => {
  const yearData: Record<
    string,
    { maxCrop: { name: string; production: number }; minCrop: { name: string; production: number } }
  > = {};

  data.forEach((item) => {
    const year = item.Year.match(/\d{4}/)?.[0];
    const production = parseFloat(item["Crop Production (UOM:t(Tonnes))"] as string) || 0;

    if (!year) return;

    if (!yearData[year]) {
      yearData[year] = {
        maxCrop: { name: item["Crop Name"], production },
        minCrop: { name: item["Crop Name"], production },
      };
    } else {
      if (production > yearData[year].maxCrop.production) {
        yearData[year].maxCrop = { name: item["Crop Name"], production };
      }
      if (production < yearData[year].minCrop.production) {
        yearData[year].minCrop = { name: item["Crop Name"], production };
      }
    }
  });

  return Object.entries(yearData).map(([year, crops]) => ({
    year,
    maxCrop: crops.maxCrop.name,
    minCrop: crops.minCrop.name,
  }));
};
