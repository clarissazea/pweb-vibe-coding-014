import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser, registerUser } from '../api/authApi';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      // REGISTER
      if (mode === 'register') {
        await registerUser({ email, password });
      }

      // LOGIN
      const res = await loginUser({ email, password });
      login(res.token);

      // 🔥 REDIRECT SETELAH LOGIN
      navigate('/');   // sesuaikan dengan route dashboardmu

    } catch (error: any) {
      setErr(error?.response?.data?.msg || 'Gagal autentikasi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{mode === 'login' ? 'Login' : 'Registrasi'}</h2>
        {err && <p className="error-message">{err}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email"
                 value={email} onChange={(e) => setEmail(e.target.value)} required />

          <input type="password" placeholder="Password"
                 value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? <LoadingSpinner /> : (mode === 'login' ? 'Login' : 'Daftar')}
          </button>
        </form>

        <p className="toggle-text">
          {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}
          <button className="toggle-btn-link"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'Daftar di sini' : 'Login di sini'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
