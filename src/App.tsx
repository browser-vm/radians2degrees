import React from 'react';
import ConverterCard from './components/ConverterCard';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center">
      <Header />
      <main className="flex-1 w-full max-w-4xl px-4 py-8 flex items-center justify-center">
        <ConverterCard />
      </main>
      <Footer />
    </div>
  );
}

export default App;