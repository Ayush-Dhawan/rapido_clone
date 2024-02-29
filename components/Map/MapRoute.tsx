import React from "react";
import { Layer, Source } from "react-map-gl";

export default function MapRoute(props: any) {
  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: props.coordinates,
        },
        properties: {},
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "round" }}
        paint={{ "line-color": "black", "line-width": 4 }}
      />
    </Source>
  );
}
