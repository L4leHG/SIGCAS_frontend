import React, { useMemo } from "react";
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
import { reprojectGeoJSON } from "../../../utils/reprojectGeoJson";

const PredioMap = (props) => {
  const terrenoOriginal = props.detailPredio?.terreno_geo?.[0]?.geometria;
  const terreno_geo = terrenoOriginal
    ? reprojectGeoJSON(terrenoOriginal)
    : null;
  const unidadesOriginal = props.detailPredio?.unidades_construccion_geo || [];
  const unidadesReproyectadas = unidadesOriginal.map((unidad) => ({
    ...unidad,
    geometria: reprojectGeoJSON(unidad.geometria),
  }));
  // const selectedZona = props?.selectedFeature ? [props.selectedFeature] : [];
  const allFeatures = [];

  if (terreno_geo?.[0]?.geometria) {
    allFeatures.push({ type: "Feature", ...terreno_geo });
  }

  if (unidadesReproyectadas.length > 0) {
    allFeatures.push(...unidadesReproyectadas.map((u) => u.geometria));
  }

  const allGeoData = {type: "FeatureCollection", features: allFeatures};

  const mapKey = useMemo(() => {
    if (!allGeoData.features.length) return 'static';
    return JSON.stringify(allGeoData);
  }, [allGeoData]);


  const getStyleByPiso = (feature) => {
    const piso = feature.unidadesOriginal?.planta_ubicacion;
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
      center={[4.71173, -75.84197]}
      zoom={12}
      maxZoom={23}
      boxZoom={false}
      dragging={true}
      touchZoom={false}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      zoomControl={true}
    >
      <FitBoundsOnData geoData={allGeoData} />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      <>
        {terreno_geo && <LayerConsulta data={terreno_geo} fitOnLoad={true} />}

        {/* Recorrer todas las unidades y enviar SOLO la geometría a LayerConsulta */}
        {unidadesReproyectadas.map((unidad, index) =>
          unidad.geometria ? (
            <LayerConsulta
                key={index}
                data={unidad.geometria}
                fitOnLoad={false}
              />
          ) : null
        )}
      </>
      <LayersControl position="bottomleft">
        <LayersControl.Overlay
          name="Terreno"
          checked={false} // no activado por defecto
        >
          <WMSTileLayer
            url="http://localhost:8082/geoserver/cartografia/wms?service"
            layers="catastral:geovisor_terreno_sicam"
            format="image/png"
            transparent={true}
            version="1.3.0"
            maxZoom={23}
          />
        </LayersControl.Overlay>
        {unidadesReproyectadas.map((unidad, index) => (
          <LayersControl.Overlay
            checked
            key={index}
            name={`Unidad ${
              unidad.caracteristicas_unidadconstruccion?.identificador ||
              index + 1
            }`}
          >
            <GeoJSON
              data={unidad.geometria}
              style={() => getStyleByPiso(unidad)}
              onEachFeature={(feature, layer) => {
                const label =
                  unidad.caracteristicas_unidadconstruccion?.identificador ||
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
      {(unidadesReproyectadas?.length > 0 || terreno_geo) && (
        <WMSTileLayer
          url="http://localhost:8082/geoserver/cartografia/wms?service"
          layers="catastral:geovisor_terreno_sicam"
          format="image/png"
          transparent={true}
          version="1.3.0" // O la versión que requiera tu servicio WMS
          maxZoom={23}
        />
      )}
    </MapContainer>
  );
};

export default PredioMap;