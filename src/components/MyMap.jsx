import React, { useEffect } from 'react';
import countries from '../data/countries.json';

export default function MyMap() {
  useEffect(() => {
    console.log(countries);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>My Map</h1>
    </div>
  );
}
