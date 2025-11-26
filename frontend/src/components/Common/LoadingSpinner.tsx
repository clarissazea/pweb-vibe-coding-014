import React from 'react';

const LoadingSpinner: React.FC<{ fullscreen?: boolean }> = ({ fullscreen }) => {
  return (
    <div style={{
      display: 'grid',
      placeItems: 'center',
      width: '100%',
      ...(fullscreen ? { minHeight: '60vh' } : {})
    }}>
      <div className="spinner" />
    </div>
  );
};

export default LoadingSpinner;
