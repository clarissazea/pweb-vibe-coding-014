import React, { useEffect, useState } from 'react';
import { getExpiringSoon, deleteFoodItem } from '../api/foodApi';
// import {get}
import LoadingSpinner from '../components/Common/LoadingSpinner';
import FoodCard from '../components/Common/FoodCard';
import type { FoodItem } from '../types/food';

const ExpiringSoonPage: React.FC = () => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setErr('');
    try {
      const data = await getExpiringSoon();
      setItems(data);
    } catch {
      setErr('Gagal memuat peringatan kedaluwarsa.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus item ini?')) return;
    try {
      await deleteFoodItem(id);
      await fetchData();
    } catch {
      alert('Gagal menghapus item.');
    }
  };

  if (loading) return <LoadingSpinner fullscreen />;
  if (err) return <div className="error-container">Error: {err}</div>;

  return (
    <div className="expiring-container">
      <h2>⚠️ Segera Habiskan (≤ 3 hari dari backend)</h2>
      <div className="food-grid">
        {items.length > 0 ? items.map(item => (
          <FoodCard key={item._id} item={item} onDelete={handleDelete} />
        )) : <p className="no-data">Semua stok dalam kondisi aman.</p>}
      </div>
    </div>
  );
};

export default ExpiringSoonPage;
