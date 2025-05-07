import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Rad2Deg Converter</p>
        <p className="mt-2 sm:mt-0">
          <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs font-mono">1 radian ≈ 57.2958° degrees</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;