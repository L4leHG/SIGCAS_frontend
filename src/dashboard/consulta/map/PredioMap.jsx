import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayersControl,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import LayerConsulta from "./LayerConsulta";
import FitBoundsOnData from "./fitbounds";

const PredioMap = (props) => {
  const terreno_geo = props.detailPredio?.terreno_geo;
  const unidades_geo = props.detailPredio?.unidades_construccion_geo;
  const allFeatures = [];

  if (terreno_geo?.geometry) {
    allFeatures.push({ type: "Feature", ...terreno_geo });
  }

  if (Array.isArray(unidades_geo?.features)) {
    allFeatures.push(...unidades_geo.features);
  }

  const allGeoData = { type: "FeatureCollection", features: allFeatures };

  const mapKey = JSON.stringify(allGeoData);

  const getStyleByPiso = (feature) => {
    const piso = feature.properties.planta_ubicacion;
    if (piso === 1) {
      return {
        color: "blue",
        fillColor: "lightblue",
        weight: 2,
        fillOpacity: 0.4,
      };
    } else if (piso === 2) {
      return { color: "red", fillColor: "pink", weight: 2, fillOpacity: 0.4 };
    } else if (piso >= 3) {
      return {
        color: "green",
        fillColor: "lightgreen",
        weight: 2,
        fillOpacity: 0.4,
      };
    }
    return {
      color: "gray",
      fillColor: "lightgray",
      weight: 2,
      fillOpacity: 0.4,
    };
  };

  return (
    <MapContainer
      key={mapKey} // Forzar rerender cuando cambian geometrías
      center={[4.5340, -76.1031]}
      zoom={12}
      maxZoom={20}
      boxZoom={false}
      dragging={true}
      touchZoom={false}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      zoomControl={true}
    >
      <FitBoundsOnData geoData={allGeoData} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={20}/>
      <>
        {terreno_geo && <LayerConsulta data={terreno_geo} fitOnLoad={true} />}
        {/* Recorrer todas las unidades y enviar SOLO la geometría a LayerConsulta */}
        {unidades_geo?.features?.map(
          (feature, index) =>
            feature.geometry && (
              <LayerConsulta
                key={index}
                data={feature.geometry}
                fitOnLoad={false}
              />
            )
        )}
      </>
      <LayersControl position="bottomleft">
        <LayersControl.Overlay
          name="Terreno"
          checked={true} // no activado por defecto
        >
          <WMSTileLayer
            url="http://localhost:8082/geoserver/cartografia/wms?service"
            layers="cartografia:terrenos_view"
            format="image/png"
            transparent={true}
            version="1.3.0"
            maxZoom={23}
          />
        </LayersControl.Overlay>
        {unidades_geo?.features?.map((unidad, index) => (
          <LayersControl.Overlay
            checked
            key={index}
            name={`Unidad ${
              unidad.caracteristicas_unidadconstruccion?.identificador ||
              index + 1
            }`}
          >
            <GeoJSON
              data={unidad.geometry}
              style={() => getStyleByPiso(unidad)}
              onEachFeature={(feature, layer) => {
                const label =
                  feature.caracteristicas_unidadconstruccion?.identificador ||
                  `Unidad ${index + 1}`;
                layer.bindTooltip(label, {
                  permanent: false,
                  direction: "center",
                  className: "custom-tooltip",
                });
                layer.on("add", () => layer.bringToFront());
              }}
            />
          </LayersControl.Overlay>
        ))}
      </LayersControl>
      {(unidades_geo?.length > 0 || terreno_geo) && (
        <WMSTileLayer
          url="http://localhost:8082/geoserver/cartografia/wms?service"
          layers="cartografia:terrenos_view"
          format="image/png"
          transparent={true}
          version="0.0.0" // O la versión que requiera tu servicio WMS
          maxZoom={23}
        />
      )}
    </MapContainer>
  );
};

export default PredioMap;
