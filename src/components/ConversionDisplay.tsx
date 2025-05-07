import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { InlineMath } from 'react-katex';
import { ConversionResult } from '../utils/conversion';

interface ConversionDisplayProps {
  result: ConversionResult;
}

const ConversionDisplay: React.FC<ConversionDisplayProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(result.degrees.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6 animate-fade-in">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Conversion Formula</h3>
        <div className="bg-white p-3 rounded border border-gray-200 text-center">
          <InlineMath math={`${result.radianDisplay} \\text{ rad} \\times \\frac{180°}{\\pi} = ${result.degreeDisplay} \\text{ degrees}`} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Result</h3>
        <div className="relative">
          <div className="bg-white p-3 rounded border border-gray-200 flex items-center justify-between">
            <div className="text-xl font-medium text-gray-800">
              {result.degreeDisplay}° 
              <span className="text-sm text-gray-500 ml-1">degrees</span>
            </div>
            <button 
              onClick={handleCopy}
              className="p-1.5 text-gray-500 hover:text-blue-500 transition-colors duration-200"
              title={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionDisplay;