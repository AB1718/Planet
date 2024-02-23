// PlanetCard.js
import React from 'react';

function PlanetCard({ planet }) {
  return (
    <div className="planet">
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
    </div>
  );
}

export default PlanetCard;
