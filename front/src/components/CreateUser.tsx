import React, { useState } from 'react';
import { trpc } from '../lib/trpc';

const CreateUser: React.FC = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const addUserMutation = trpc.addUser.useMutation();

  const handleAddUser = async () => {
    await addUserMutation.mutateAsync(newUser);
    setNewUser({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <h3>Create New User</h3>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default CreateUser;