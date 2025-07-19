import React from 'react';
import Header from '../components/Header';
import AiBioGenerator from '../components/AiBioGenerator';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header title="Robert Sletner" subtitle="Music & Art" />
      <div className="p-4">
        <div className="relative rounded-lg overflow-hidden mb-6">
            <img src="https://picsum.photos/seed/home/800/400" alt="Robert Sletner artist portrait" className="w-full h-auto object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-2xl font-bold text-white">Welcome</h2>
                <p className="text-slate-300">Explore the world of a PNW original.</p>
            </div>
        </div>

        <p className="text-slate-300 mb-4">
          From the gritty streets of "Raw B" hip-hop to the introspective folk of "Mr Sletner" and the quirky beats of "Dookie Trackshoes," this is the official hub for all of Robert Sletner's creative work.
        </p>
        
        <a
          href="https://linktr.ee/mrsletner"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-brand-secondary hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 my-6"
          aria-label="Find more on Linktree (opens in a new tab)"
        >
          Find More on Linktree
        </a>

        <AiBioGenerator />

      </div>
    </div>
  );
};

export default HomePage;