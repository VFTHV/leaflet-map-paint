import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import mapData from '../data/countries.json';
import 'leaflet/dist/leaflet.css';
import './MyMap.css';

export default function MyMap() {
  const [fillColor, setFillColor] = useState('#00FF00');

  const countryStyle = {
    fillColor: 'green',
    fillOpacity: 1,
    color: 'black',
    weight: 2,
  };

  const fillColorRef = useRef(fillColor);

  useEffect(() => {
    fillColorRef.current = fillColor;
  }, [fillColor]);

  const changeCountryColor = (event) => {
    const newFillColor = fillColorRef.current;

    event.target.setStyle({
      fillColor: newFillColor,
    });
  };

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;

    layer.bindPopup(countryName);

    layer.options.fillOpacity = 1;
    layer.options.fillColor = 'green';
    layer.options.color = 'black';
    layer.options.weight = 2;

    layer.options = {
      ...layer.options,
      ...countryStyle,
    };

    layer.on({
      click: changeCountryColor,
      // mouseover: changeCountryColor,
    });
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <label>
          Choose color for country:
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
          />
        </label>
      </div>
      <h1 style={{ textAlign: 'center' }}>My Map</h1>
      <MapContainer
        style={{
          height: '80vh',
        }}
        zoom={2}
        center={[29.646539, -95.673716]}
      >
        <GeoJSON
          // style={countryStyle}
          data={mapData.features}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </div>
  );
}
