import React from 'react';

import json from '../public/api/cars.json';

function App() {
  return (
    <div className='app'>
      <div className='list'>
        {json.map((item, k) => (
          <div className='item' key={k}></div>
        ))}
      </div>
    </div>
  );
}

export default App;
