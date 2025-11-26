import React from 'react';
import type { FoodItem } from '../../types/food';

interface FoodCardProps {
  item: FoodItem;
  onDelete: (id: string) => void;
}

const getExpiryStatus = (expiryDate: string): { label: string; className: string } => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: 'EXPIRED', className: 'status-expired' };
  if (diff <= 7) return { label: `Segera Habis (${diff} hari)`, className: 'status-warning' };
  return { label: 'Aman', className: 'status-safe' };
};

const FoodCard: React.FC<FoodCardProps> = ({ item, onDelete }) => {
  const status = getExpiryStatus(item.expiryDate);

  const imageSrc = item.image
    ? `http://localhost:5000${item.image}` // backend stores "/uploads/filename"
    : undefined;

  return (
    <div className={`food-card ${status.className}`}>
      {imageSrc && <img className="food-image" src={imageSrc} alt={item.name} />}
      <div className="card-content">
        <h3>{item.name}</h3>
        <p><strong>Jumlah:</strong> {item.quantity}</p>
        <p><strong>Kedaluwarsa:</strong> {new Date(item.expiryDate).toLocaleDateString()}</p>
        <p className={`status-tag ${status.className}`}>{status.label}</p>

        <div className="card-actions">
          <button className="btn-delete" onClick={() => onDelete(item._id)}>Habiskan / Hapus</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
