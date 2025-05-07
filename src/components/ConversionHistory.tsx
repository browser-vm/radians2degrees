import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { ConversionResult } from '../utils/conversion';

interface ConversionHistoryProps {
  history: ConversionResult[];
  onSelect: (item: ConversionResult) => void;
}

const ConversionHistory: React.FC<ConversionHistoryProps> = ({ history, onSelect }) => {
  if (history.length === 0) return null;
  
  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <div className="flex items-center mb-3">
        <Clock size={16} className="text-gray-400 mr-2" />
        <h3 className="text-sm font-medium text-gray-500">Recent Conversions</h3>
      </div>
      <ul className="space-y-2 animate-fade-in">
        {history.map((item, index) => (
          <li 
            key={index}
            className="group flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-md p-2 cursor-pointer transition-colors duration-200"
            onClick={() => onSelect(item)}
          >
            <div className="flex items-center">
              <span className="font-mono text-xs text-gray-500 mr-2">{item.radianDisplay}</span>
              <span className="text-gray-400 mx-1">→</span>
              <span className="font-medium text-gray-700">{item.degreeDisplay}°</span>
            </div>
            <ArrowUpRight 
              size={16} 
              className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversionHistory;