import { useRef, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const LayerConsulta = ({ data, fitOnLoad = false }) => {
  const map = useMap();
  const geoJsonLayerRef = useRef(null);

  useEffect(() => {
    if (data && map) {
      if (geoJsonLayerRef.current) {
        map.removeLayer(geoJsonLayerRef.current);
      }
  
      geoJsonLayerRef.current = L.geoJSON(data, {
        style: {
          color: "orange",
          fillColor: "orange",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.4,
        },
      });
  
      geoJsonLayerRef.current.addTo(map);
  
      if (fitOnLoad) {
        setTimeout(() => {
          const bounds = geoJsonLayerRef.current.getBounds();
          if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [5, 5] });
          }
        }, 0);
      }
    }
  }, [data, map, fitOnLoad]);
  
  return null;
};

export default LayerConsulta;