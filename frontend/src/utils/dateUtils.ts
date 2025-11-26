// Fungsi untuk menghitung sisa hari kedaluwarsa
export const getDaysRemaining = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  // Hapus waktu (time) untuk perbandingan yang adil
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Fungsi untuk menentukan status kedaluwarsa
export const getExpiryStatus = (days: number): 'EXPIRED' | 'SOON' | 'SAFE' => {
  if (days < 0) return 'EXPIRED';
  if (days <= 7) return 'SOON';
  return 'SAFE';
};