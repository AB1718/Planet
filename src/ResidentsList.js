// ResidentsList.js
import React, { useState, useEffect } from 'react';

function ResidentsList({ residentsUrls }) {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResidents = async () => {
      setLoading(true);
      try {
        const promises = residentsUrls.map(async url => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch resident data');
          }
          const data = await response.json();
          return data.name;
        });
        const residentsData = await Promise.all(promises);
        setResidents(residentsData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (residentsUrls.length > 0) {
      fetchResidents();
    }
  }, [residentsUrls]);

  return (
    <div className="residents-list">
      <h3>Residents:</h3>
      {loading ? (
        <p>Loading residents...</p>
      ) : (
        <ul>
          {residents.map((resident, index) => (
            <li key={index}>{resident}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResidentsList;
