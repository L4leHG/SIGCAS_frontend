import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const FitBoundsOnData = ({ geoData }) => {
  const map = useMap();

  useEffect(() => {
    if (!geoData || !geoData.features || geoData.features.length === 0) return;

    const geoJsonLayer = L.geoJSON(geoData);
    const bounds = geoJsonLayer.getBounds();

    if (bounds.isValid()) {
      setTimeout(() => {
        map.fitBounds(bounds, { padding: [20, 20] });
      }, 0); // Espera a que el mapa esté montado visualmente
    }
  }, [geoData, map]);

  return null;
};

export default FitBoundsOnData;