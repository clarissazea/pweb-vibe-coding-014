import React, { useEffect, useMemo, useState } from 'react';
import FoodCard from '../components/Common/FoodCard';
import FilterBar from '../components/Inventory/FilterBar';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import type { FoodItem, FoodUnit } from '../types/food';
import {getFoodItems, createFoodItem, deleteFoodItem, getFoodItemById, updateFoodItem } from '../api/foodApi';

interface DashboardPageProps {
  globalSearchQuery: string;
}

const unitOptions: (FoodUnit | 'all')[] = ['all', 'pcs', 'kg', 'liter', 'box', 'other'];

const DashboardPage: React.FC<DashboardPageProps> = ({ globalSearchQuery }) => {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>('');
  const [unit, setUnit] = useState<FoodUnit | 'all'>('all');

  const fetchData = async () => {
    setLoading(true);
    setErr('');
    try {
      const data = await getFoodItems();
      setItems(data);
    } catch (e: any) {
      setErr('Gagal memuat inventaris');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => {
    return items
      .filter(i => i.name.toLowerCase().includes(globalSearchQuery.toLowerCase()))
      // Unit filter is UI-only until unit exists in backend data:
      .filter(i => unit === 'all' ? true : true);
  }, [items, globalSearchQuery, unit]);

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
    <div className="dashboard-container">
      <h2>Stok Inventaris</h2>
      <FilterBar unitOptions={unitOptions} currentUnit={unit} onUnitChange={setUnit} />
      <div className="food-grid">
        {filtered.length > 0 ? filtered.map(item => (
          <FoodCard key={item._id} item={item} onDelete={handleDelete} />
        )) : <p className="no-data">Tidak ada stok makanan yang ditemukan.</p>}
      </div>
    </div>
  );
};

export default DashboardPage;
