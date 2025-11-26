import React from 'react';
import type { FoodUnit } from '../../types/food';

interface FilterBarProps {
  unitOptions: (FoodUnit | 'all')[];
  currentUnit: FoodUnit | 'all';
  onUnitChange: (u: FoodUnit | 'all') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ unitOptions, currentUnit, onUnitChange }) => {
  return (
    <div className="filter-bar">
      <label>Filter Satuan:</label>
      <select value={currentUnit} onChange={(e) => onUnitChange(e.target.value as FoodUnit | 'all')}>
        {unitOptions.map(u => (
          <option key={u} value={u}>{u === 'all' ? 'Semua' : u}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
