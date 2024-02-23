// App.js
import React, { useState, useEffect } from 'react';
import PlanetCard from './PlanetCard';
import ResidentsList from './ResidentsList';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPlanets(data.results);
        setNextPage(data.next);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  const fetchNextPage = async () => {
    if (nextPage) {
      setLoading(true);
      try {
        const response = await fetch(nextPage);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPlanets(prevPlanets => [...prevPlanets, ...data.results]);
        setNextPage(data.next);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="app">
      <h1>Star Wars Planets Directory</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="planets">
        {planets.map(planet => (
          <div key={planet.name} className="planet-card">
            <PlanetCard planet={planet} />
            <ResidentsList residentsUrls={planet.residents} />
          </div>
        ))}
      </div>
      <button onClick={fetchNextPage} disabled={loading || !nextPage}>
        Load More
      </button>
    </div>
  );
}

export default App;
