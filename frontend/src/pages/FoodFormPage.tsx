// src/pages/FoodFormPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { FoodFormInput, FoodUnit } from '../types/food';
import { createFoodItem, getFoodItemById, updateFoodItem } from '../api/foodApi';
// import LoadingSpinner from '../components/Common/LoadingSpinner'; // Asumsi ada

const initialFormState: FoodFormInput = {
  name: '',
  quantity: 0,
  unit: 'pcs',
  expiryDate: '',
};

const unitOptions: FoodUnit[] = ['pcs', 'kg', 'liter', 'box', 'other'];

const FoodFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FoodFormInput>(initialFormState);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = !!id;

  // Fetch data jika Edit Mode
  useEffect(() => {
    if (isEditMode && id) {
      setLoading(true);
      getFoodItemById(id)
        .then(item => {
          // Format tanggal ke YYYY-MM-DD
          const formattedDate = item.expiryDate.split('T')[0];
          setFormData({
            name: item.name,
            quantity: item.quantity,
            // unit: item.unit,
            expiryDate: formattedDate,
          });
          setLoading(false);
        })
        .catch(() => {
          setError('Gagal memuat data item.');
          setLoading(false);
        });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      // Mengubah string menjadi number untuk field quantity
      [name]: type === 'number' ? Number(value) : value, 
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode && id) {
        await updateFoodItem(id, formData, file);
        alert('Item berhasil diperbarui!');
      } else {
        await createFoodItem(formData, file);
        alert('Item baru berhasil ditambahkan!');
      }
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal menyimpan data inventaris.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) return <div className="loading-spinner-container">Memuat data edit...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="form-container">
      <h2>{isEditMode ? 'Edit Stok Makanan' : 'Tambah Stok Makanan Baru'}</h2>
      <form onSubmit={handleSubmit} className="food-form">
        
        <label>Nama Makanan:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        
        <label>Jumlah (Quantity):</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" required />
        
        <label>Satuan (Unit):</label>
        <select name="unit" value={formData.unit} onChange={handleChange} required>
          {unitOptions.map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
        
        <label>Tanggal Kedaluwarsa:</label>
        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
        
        <label>Upload Foto (Opsional):</label>
        <input type="file" name="photo" onChange={handleFileChange} accept="image/*" />
        
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Tambahkan Stok')}
        </button>
      </form>
    </div>
  );
};

export default FoodFormPage;