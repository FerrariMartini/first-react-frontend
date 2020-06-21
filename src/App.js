import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../src/services/api"

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data)
    })

  }, []);


  async function handleAddRepository() {

    const response = await api.post("repositories",
      {
        title: "REPO Blockchain - FrontEnd React",
        url: "https://github.com.br/API",
        techs: ["Blockchains", "hyperledger", "ethereum"]
      }
    );

    const repository = response.data

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(item => item.id !== id))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id}>
              {repo.title}<button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          )
        }
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
