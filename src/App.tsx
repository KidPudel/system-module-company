import { useState, useEffect } from "react";
import "./App.css";
import Contract from "./types/Contract";
import User from "./types/User";
import ContractList from "./components/ContractList";
import UserList from "./components/UserList";
import ContractForm from "./components/ContractForm";
import EditContractForm from "./components/EditContractForm";
import UserForm from "./components/UserForm";
import EditUserForm from "./components/EditUserForm";
import { Switch, Input, Card } from "@mui/material";
import { deserialize, serialize } from "v8";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  function handleSwitchToggle() {
    setIsAdmin(!isAdmin);
  }





  return (
    <div className="App">
      <header className={isAdmin ? "App-header-admin" : "App-header-user"}>
        <h1> {isAdmin ? "User Manager" : "Contract Manager"}</h1>
        <label>
          <Switch
            type="checkbox"
            checked={isAdmin}
            onChange={handleSwitchToggle}
          />
          is admin
        </label>
      </header>
      {isAdmin ? <AdminPanel /> : <UserPanel />}
    </div>
  );
}

export default App;

function UserPanel() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [foundContracts, setFoundContracts] = useState<Contract[]>([]);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  async function handleGetContracts() {
    try {
      const response = await fetch('http://localhost:3001/contracts', {
        method: 'GET'
      });

      const data = await response.json();

      setContracts(data);
      setFoundContracts(data);

    } catch (error) {
      console.error(error);
    }

  }

  async function handleAddContract(contract: Contract) {
    try {
      const response = await fetch('http://localhost:3001/contract', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contract)
      });

      if (!response.ok) {
        throw new Error('Failed to add a user');
      }
      await handleGetContracts();
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetContracts();
  }, [])

  async function handleEditContract(contract: Contract) {
    const updatedContracts = contracts.map((c) =>
      c.id === contract.id ? contract : c
    );
    setContracts(updatedContracts);
    setFoundContracts(updatedContracts);
    setEditingContract(null);
  }

  async function handleDeleteContract(title: string) {
    const updatedContracts = contracts.filter((c) => c.title !== title);
    setContracts(updatedContracts);
    setFoundContracts(updatedContracts);
  }

  async function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    let found = contracts.filter((contract) =>
      contract.title.includes(event.target.value)
    );
    setFoundContracts(found);
  }

  return (
    <main className="User-panel">
      <Card className="Card" sx={{ boxShadow: "5px 5px 0" }}>
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </Card>
      {editingContract ? (
        <EditContractForm
          contract={editingContract}
          onSubmit={handleEditContract}
        />
      ) : (
        <ContractForm onSubmit={handleAddContract} />
      )}
      <ContractList
        contracts={foundContracts != null ? foundContracts : contracts}
        onEdit={(contract) => setEditingContract(contract)}
        onDelete={handleDeleteContract}
      />
    </main>
  );
}

function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [foundUsers, setFoundUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  let [searchQuery, setSearchQuery] = useState("");


  async function handleGetUsers() {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error('my name is aaaa')
      }
      const data = await response.json();
      console.log(data)
      setUsers(data);
      setFoundUsers(data);

    }
    catch (error) {
      console.error(error)
    }
  }

  async function handleAddUser(user: User) {
    try {
      const response = await fetch('http://localhost:3001/user', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Failed to add a user');
      }
      await handleGetUsers();
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGetUsers();
  }, [])

  // when eddit is clicked in the list it is updated and we now in EditUserForm
  function handleEditUser(pickedUser: User) {
    const updatedUsers = users.map((currentUser) =>
      currentUser.id === pickedUser.id ? pickedUser : currentUser
    );
    setUsers(updatedUsers);
    // to change a form

    setEditingUser(null);
  }

  function handleDeleteUser(name: string) {
    const updatedUsers = users.filter((user) => user.name !== name);
    setUsers(updatedUsers);
    setFoundUsers(updatedUsers);
  }

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    let found = users.filter((user) => user.name.includes(event.target.value));
    setFoundUsers(found);
  }

  return (
    <main className="Admin-panel">
      <Card className="Card" sx={{ boxShadow: "5px 5px 0" }}>
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </Card>

      {editingUser ? (
        <EditUserForm user={editingUser} onSubmit={handleEditUser} />
      ) : (
        <UserForm onSubmit={handleAddUser} />
      )}
      <UserList
        users={foundUsers != null ? foundUsers : users}
        onDelete={handleDeleteUser}
        onEdit={(user) => setEditingUser(user)}
      />
    </main>
  );
}
