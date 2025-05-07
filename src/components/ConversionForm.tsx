import React from 'react';
import { Save } from 'lucide-react';

interface ConversionFormProps {
  input: string;
  setInput: (value: string) => void;
  error: string;
  onSave: () => void;
  hasResult: boolean;
}

const ConversionForm: React.FC<ConversionFormProps> = ({ 
  input, 
  setInput, 
  error, 
  onSave,
  hasResult
}) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <label 
          htmlFor="radian-input" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter Radians
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            id="radian-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. π/4, 3π/2, 1.5"
            className={`block w-full px-4 py-3 rounded-md border ${
              error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
              'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            } shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ease-in-out`}
          />
          {hasResult && (
            <button
              onClick={onSave}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors duration-200"
              title="Save to history"
            >
              <Save size={18} />
            </button>
          )}
        </div>
        
        {error && (
          <div className="mt-2 text-sm text-red-600 animate-fade-in">
            {error}
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500">
          You can enter decimal values (like 1.5) or expressions with π (like π/2, 2π, etc.)
        </div>
      </div>
    </div>
  );
};

export default ConversionForm;