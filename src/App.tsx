import { useState } from 'react';
import './App.css';
import Contract from './types/Contract';
import ContractList from './components/ContractList';
import ContractForm from './components/ContractForm';
import EditContractForm from './components/EditContractForm';

function App() {

  const [isAdmin, setIsAdmin] = useState(false)

  function handleSwitchToggle() {
    setIsAdmin(!isAdmin);
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>Contract Manager</h1>
        <label>
          <input type='checkbox' checked={isAdmin} onChange={handleSwitchToggle}></input>
          Is Admin
        </label>
      </header>

      {isAdmin ? <AdminPanel /> : <UserPanel />}
    </div>
  );
}

function UserPanel() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);

  function handleAddContract(contract: Contract) {
    setContracts([...contracts, contract]);
  }

  function handleEditContract(contract: Contract) {
    const updatedContracts = contracts.map((c) => (c.id === contract.id ? contract : c));
    setContracts(updatedContracts);
    setEditingContract(null);
  }

  function handleDeleteContract(id: string) {
    const updatedContracts = contracts.filter((c) => c.id !== id);
    setContracts(updatedContracts);
  }
  return (
    <main>
      {editingContract ? (
        <EditContractForm contract={editingContract} onSubmit={handleEditContract} />
      ) : (
        <ContractForm onSubmit={handleAddContract} />
      )}
      <ContractList
        contracts={contracts}
        onEdit={(contract) => setEditingContract(contract)}
        onDelete={handleDeleteContract}
      />
    </main>
  );
}


function AdminPanel() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);

  function handleAddContract(contract: Contract) {
    setContracts([...contracts, contract]);
  }

  function handleEditContract(contract: Contract) {
    const updatedContracts = contracts.map((c) => (c.id === contract.id ? contract : c));
    setContracts(updatedContracts);
    setEditingContract(null);
  }

  function handleDeleteContract(id: string) {
    const updatedContracts = contracts.filter((c) => c.id !== id);
    setContracts(updatedContracts);
  }
  return (
    <main>
      <h1>Admin panel</h1>
    </main>
  );
}



export default App;
