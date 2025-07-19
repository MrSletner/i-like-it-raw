
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import MusicPage from './pages/MusicPage';
import VideosPage from './pages/VideosPage';
import ArtPage from './pages/ArtPage';
import StorePage from './pages/StorePage';
import Header from './components/Header';

function App() {
  return (
    <CartProvider>
      <HashRouter>
        <div className="bg-brand-bg text-brand-light min-h-screen font-sans flex flex-col max-w-lg mx-auto border-x border-slate-800">
          <main className="flex-grow pb-20">
             <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/music" element={<MusicPage />} />
                <Route path="/videos" element={<VideosPage />} />
                <Route path="/art" element={<ArtPage />} />
                <Route path="/store" element={<StorePage />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </HashRouter>
    </CartProvider>
  );
}

export default App;
