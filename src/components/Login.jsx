// src/components/Login.jsx
import { useState } from 'react';
import { login } from '@/services/authService';
import '@/styles/components/Login.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      window.location.href = '/projects';
    } catch (err) {
      setError(err.message || 'Connexion impossible');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={onSubmit} className="login-form">
        <h2>Connexion</h2>
        {error && <p className="error">{error}</p>}
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
