import React from "react";
import { Avaluos } from "./predio/avaluos";
import { DatosPredio } from "./predio/datosPredio";
import { Interesados } from "./predio/interesados";
import { Terrenos } from "./predio/terrenos";
import { Unidades } from "./predio/unidades";

export default function Tablas({ data }) {
  const avaluos = data?.avaluo;
  const interesados = data?.interesado;
  const terrenos = data?.terreno_alfa;
  const unidades = Array.isArray(data?.unidades_construccion_geo?.features)
    ? data.unidades_construccion_geo.features
    : [];

  return (
    <>
      <div>
        <DatosPredio data={data} />
      </div>
      <div>
        <Interesados data={interesados} />
      </div>
      <div>
        <Terrenos data={terrenos} />
      </div>
      <div>
        <Unidades data={unidades} />
      </div>
      <div>
        <Avaluos data={avaluos} />
      </div>
    </>
  );
}
