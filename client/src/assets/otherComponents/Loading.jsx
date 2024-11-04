import React, { useState } from 'react'; // Import useState

const ThreeDotBounce = ({ color = '#32cd32', size = '16px' }) => (
  <div className="three-dot-bounce" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ backgroundColor: color, width: size, height: size, borderRadius: '50%', margin: '0 5px', animation: 'bounce 0.6s infinite alternate' }}></div>
    <div style={{ backgroundColor: color, width: size, height: size, borderRadius: '50%', margin: '0 5px', animation: 'bounce 0.6s infinite alternate 0.2s' }}></div>
    <div style={{ backgroundColor: color, width: size, height: size, borderRadius: '50%', margin: '0 5px', animation: 'bounce 0.6s infinite alternate 0.4s' }}></div>
  </div>
);

function Loading() {
  const [loading] = useState(true); // If loading state is needed, handle accordingly

  return (
    loading ? <ThreeDotBounce /> : null 
  );
}

export default Loading;
