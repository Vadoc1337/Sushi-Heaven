import { IMarginScaleData } from "../data/declarations";

const scaleMarginData: IMarginScaleData[] = [
  { height: 500, scale: 0.62, marginTopBottom: -142},
  { height: 600, scale: 0.75, marginTopBottom: -90},
  { height: 750, scale: 0.9, marginTopBottom: -20 },
  { height: 800, scale: 1, marginTopBottom: 10},
  { height: 900, scale: 1.1, marginTopBottom: 60},
  { height: 1080, scale: 1.23, marginTopBottom: 145.745},
  { height: 1440, scale: 1.54, marginTopBottom: 317.236},
  { height: 2160, scale: 2.2, marginTopBottom: 683 },
];

function binarySearch(height: number): number {
  let low = 0;
  let high = scaleMarginData.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (scaleMarginData[mid].height === height) {
      return mid;
    } else if (scaleMarginData[mid].height < height) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
}

function interpolate(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

export default function calculateScaleAndMargin(height: number): {
  scale: number;
  marginTopBottom: number;
} {
  if (scaleMarginData.length === 0) {
    throw new Error("scaleMarginData is empty");
  }

  if (height <= scaleMarginData[0].height) {
    return scaleMarginData[0];
  }

  if (height >= scaleMarginData[scaleMarginData.length - 1].height) {
    return scaleMarginData[scaleMarginData.length - 1];
  }

  const index = binarySearch(height);
  const lowerData = scaleMarginData[index - 1];
  const upperData = scaleMarginData[index];

  const t = (height - lowerData.height) / (upperData.height - lowerData.height);
  const scale = interpolate(lowerData.scale, upperData.scale, t);
  const marginTopBottom = interpolate(lowerData.marginTopBottom, upperData.marginTopBottom, t);

  return { scale, marginTopBottom };
}
