import React, { useState } from 'react';
import FoodForm from '../components/Inventory/FoodForm';
import { FoodFormInput } from '../types/food';
import { createFoodItem } from '../api/foodApi';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const FoodFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FoodFormInput>({
    name: '',
    quantity: 1,
    unit: 'pcs',
    expiryDate: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    try {
      // Only name, quantity, expiryDate, image go to backend for now
      await createFoodItem(form, file);
      alert('Stok berhasil ditambahkan');
      navigate('/');
    } catch (error: any) {
      setErr(error?.response?.data?.msg || 'Gagal menyimpan data inventaris.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Tambah Stok Makanan</h2>
      {err && <p className="error-message">{err}</p>}
      {loading && <LoadingSpinner />}
      <FoodForm
        formData={form}
        onChange={(patch) => setForm(prev => ({ ...prev, ...patch }))}
        file={file}
        onFileChange={setFile}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default FoodFormPage;
