import proj4 from "proj4";

// Define el sistema de origen - MAGNA Bogotá
const sourceProj = "+proj=utm +zone=18 +ellps=GRS80 +units=m +no_defs"; // Reemplazá por tu EPSG real si no es 21896
const targetProj = "EPSG:4326";

export function reprojectGeoJSON(geojson) {
  if (!geojson || !geojson.coordinates) return geojson;

  const reprojectCoords = (coords) => {
    return coords.map((poly) =>
      poly.map((ring) =>
        ring.map(([x, y]) => proj4(sourceProj, targetProj, [x, y]))
      )
    );
  };

  return {
    ...geojson,
    coordinates: reprojectCoords(geojson.coordinates),
  };
}