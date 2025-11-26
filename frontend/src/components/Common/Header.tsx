import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    navigate('/'); // go to inventory
  };

  return (
    <header className="sticky-header">
      <div className="logo">Food Inventor</div>

      <nav className="nav-links">
        <Link to="/">Stok Inventaris</Link>
        <Link to="/add">Tambah Stok</Link>
        <Link to="/expiring">Segera Habiskan</Link>
      </nav>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Cari Nama Makanan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Cari</button>
      </form>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
