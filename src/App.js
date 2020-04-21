import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Desafio - Conceitos do ReactJS ${Date.now()}`,
      url: 'https://github.com/the-one-who-knoccks/desafio-conceitos-reactjs',
      techs: ["Node.js,", "ReactJS", "JavaScript"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    if (response.status === 204) {
      const removeRepositories = repositories.filter(repository => {
        return repository.id !== id;
      });

      setRepositories(removeRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository =>
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;