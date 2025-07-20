import React from 'react';
import Card from '../components/card';

const MobileUsability = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mobile Usability</h1>
      <Card>
        <div className="p-6">
          <p className="text-gray-600">Mobile Usability metrics will be displayed here.</p>
        </div>
      </Card>
    </div>
  );
};

export default MobileUsability;
