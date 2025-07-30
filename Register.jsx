import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { register, socialLogin } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    register(name, email, password);
    navigate('/');
  };

  const handleSocial = (provider) => {
    socialLogin(provider);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-indigo-100">
      <div className="glass p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#5f27cd]">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            autoComplete="new-password"
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="mx-2 text-gray-400 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleSocial('Google')}
            className="w-full py-2 rounded-lg bg-white border border-gray-200 flex items-center justify-center gap-2 text-gray-700 font-semibold shadow hover:bg-pink-50 transition"
          >
            <span role="img" aria-label="Google">🔵</span> Sign up with Google
          </button>
          <button
            onClick={() => handleSocial('Facebook')}
            className="w-full py-2 rounded-lg bg-white border border-gray-200 flex items-center justify-center gap-2 text-gray-700 font-semibold shadow hover:bg-indigo-50 transition"
          >
            <span role="img" aria-label="Facebook">🔷</span> Sign up with Facebook
          </button>
        </div>
        <div className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-500 font-semibold hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
