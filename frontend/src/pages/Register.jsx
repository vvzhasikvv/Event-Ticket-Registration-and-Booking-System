import { useState } from 'react';
import { register } from '../services/authService';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await register(form);
      setMessage('Registration successful');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section className="auth">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button className="btn" type="submit">Create Account</button>
      </form>
      {message && <p className="muted">{message}</p>}
    </section>
  );
};

export default Register;
