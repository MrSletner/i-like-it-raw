import React, { useState, useCallback } from 'react';
import { generateBio } from '../services/geminiService';

const AiBioGenerator: React.FC = () => {
  const [bio, setBio] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = useState<string>('');

  const personas = ['Raw B', 'Mr Sletner', 'Dookie Trackshoes', 'III Kings'];

  const handleGenerateBio = useCallback(async (persona: string) => {
    setSelectedPersona(persona);
    setLoading(true);
    setBio('');
    const generatedBio = await generateBio(persona);
    setBio(generatedBio);
    setLoading(false);
  }, []);

  return (
    <div className="bg-slate-900 rounded-lg p-4 my-4">
      <h3 className="text-lg font-bold text-brand-primary font-orbitron mb-3">AI Bio Generator</h3>
      <p className="text-sm text-slate-400 mb-4">Select a persona to generate a unique bio using Gemini AI.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {personas.map(p => (
          <button
            key={p}
            onClick={() => handleGenerateBio(p)}
            disabled={loading}
            className="w-full px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-brand-primary bg-brand-primary text-white hover:bg-teal-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
          >
            {p}
          </button>
        ))}
      </div>
      {loading && (
        <div className="flex items-center justify-center p-6 bg-slate-800 rounded-md">
           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
           <p className="ml-3 text-slate-300">Generating bio for {selectedPersona}...</p>
        </div>
      )}
      {bio && !loading && (
        <div className="p-4 bg-slate-800 rounded-md">
            <blockquote className="text-slate-300 italic border-l-4 border-brand-primary pl-4">
                {bio}
            </blockquote>
        </div>
      )}
    </div>
  );
};

export default AiBioGenerator;
