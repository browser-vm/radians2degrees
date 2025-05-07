import React from 'react';
import { RotateCcw } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RotateCcw className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-medium text-gray-800">Radians to Degrees</h1>
        </div>
        <span className="text-sm text-gray-500">Precise Mathematical Conversion</span>
      </div>
    </header>
  );
};

export default Header;