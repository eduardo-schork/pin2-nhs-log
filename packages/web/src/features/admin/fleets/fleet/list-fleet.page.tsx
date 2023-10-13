import React, { useEffect, useState } from 'react';

function ListFleets() {
  const [fleets, setFleets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/fleet')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar as frotas');
        }
        return response.json();
      })
      .then(data => setFleets(data))
      .catch(error => setError(error.message));
  }, []);

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h2>Listagem de Frotas</h2>
      <ul>
        {fleets.map((fleet) => (
          <li key={fleet.pk_fleet}>{fleet.fleetName}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListFleets;
