import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "../src/services/api"

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data)
    })

  }, [repositories]);


  async function handleAddRepository() {
    const newRepo = {
      title: "REPO Blockchain - FrontEnd React",
      url: "https://github.com.br/API",
      techs: ["Blockchains", "hyperledger", "ethereum"]
    };

    const response = await api.post("repositories", newRepo);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo =>
          <li key={repo.id}>
            {repo.title}<button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
