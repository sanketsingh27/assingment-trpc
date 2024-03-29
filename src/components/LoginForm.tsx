import React, { useState } from 'react';
import { api } from "~/utils/api";


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = api.auth.login.useMutation({
    onSuccess: (data) =>  alert(`SUCCESS ,${data}`),
    // todo : redirection 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    // Call the onLogin function passed from parent component
    mutation.mutate({email,password})
    // Clear input fields
    setEmail('');
    setPassword('');
  };


  return (
    <>
    <main className=" bg-slate-500">
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
    </main>
    </>
  );
};

export default LoginForm;
