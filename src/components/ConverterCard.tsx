import React, { useState, useEffect } from 'react';
import ConversionForm from './ConversionForm';
import ConversionDisplay from './ConversionDisplay';
import ConversionHistory from './ConversionHistory';
import { ConversionResult, convertToDegrees, parseRadianInput } from '../utils/conversion';

const ConverterCard: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [history, setHistory] = useState<ConversionResult[]>([]);
  const [error, setError] = useState<string>('');
  
  useEffect(() => {
    try {
      if (input.trim() === '') {
        setResult(null);
        setError('');
        return;
      }
      
      const parsedInput = parseRadianInput(input);
      const convertedResult = convertToDegrees(parsedInput);
      
      setResult(convertedResult);
      setError('');
    } catch (err) {
      setResult(null);
      setError((err as Error).message);
    }
  }, [input]);

  const handleSaveResult = () => {
    if (result) {
      const newHistory = [result, ...history.slice(0, 4)];
      setHistory(newHistory);
    }
  };

  const handleApplyFromHistory = (item: ConversionResult) => {
    setInput(item.radianDisplay);
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-medium text-gray-800 mb-6">Convert Radians to Degrees</h2>
        
        <ConversionForm 
          input={input} 
          setInput={setInput} 
          error={error}
          onSave={handleSaveResult} 
          hasResult={!!result} 
        />
        
        {result && (
          <ConversionDisplay result={result} />
        )}
        
        {history.length > 0 && (
          <ConversionHistory 
            history={history} 
            onSelect={handleApplyFromHistory} 
          />
        )}
      </div>
    </div>
  );
};

export default ConverterCard;