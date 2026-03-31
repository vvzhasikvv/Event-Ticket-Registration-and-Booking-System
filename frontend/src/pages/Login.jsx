import { useState } from 'react';
import { login } from '../services/authService';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await login(form);
      setMessage('Login successful');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="auth">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button className="btn" type="submit">Login</button>
      </form>
      {message && <p className="muted">{message}</p>}
    </section>
  );
};

export default Login;
