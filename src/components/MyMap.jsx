import React, { useEffect } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import mapData from '../data/countries.json';
import 'leaflet/dist/leaflet.css';
import './MyMap.css';

export default function MyMap() {
  const countryStyle = {
    fillColor: 'green',
    fillOpacity: 1,
    color: 'black',
    weight: 2,
  };

  const printMessageToConsole = (event) => {
    console.log('clicked');
  };
  const changeCountryColor = (event) => {
    console.log(event);
    event.target.setStyle({ color: 'green', fillColor: 'yellow' });
  };

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;

    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    layer.options.fillColor = `rgb(${red}, ${green}, ${blue})`;

    layer.bindPopup(countryName);
    layer.on({
      click: changeCountryColor,
      // mouseover: changeCountryColor,
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>My Map</h1>
      <MapContainer
        style={{
          height: '80vh',
        }}
        zoom={2}
        center={[29.646539, -95.673716]}
      >
        <GeoJSON
          style={countryStyle}
          data={mapData.features}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </div>
  );
}
