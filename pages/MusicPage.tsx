
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { albums } from '../data/mockData';
import { Album } from '../types';

const AlbumCard: React.FC<{ album: Album }> = ({ album }) => (
    <div className="bg-slate-900 rounded-lg overflow-hidden">
        <img src={album.coverArt} alt={album.title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="font-bold text-lg text-white">{album.title}</h3>
            <p className="text-sm text-brand-primary font-semibold">{album.persona} <span className="text-slate-400 font-normal">- {album.year}</span></p>
            
            {album.embedUrl ? (
                <iframe
                    title={`Music player for ${album.title}`}
                    className="mt-4 rounded-lg"
                    style={{ border: 0, width: '100%', height: album.embedHeight || '120px' }}
                    src={album.embedUrl}
                    seamless
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                    allow="autoplay *; encrypted-media *;"
                >
                    {album.albumPurchaseUrl && <a href={album.albumPurchaseUrl}>{album.title} by {album.persona}</a>}
                </iframe>
            ) : (
                <ul className="mt-3 space-y-2">
                    {album.tracks.map(track => (
                        <li key={track.id} className="flex justify-between items-center p-2 rounded-md hover:bg-slate-800 transition-colors">
                            <span className="text-slate-300">{track.title}</span>
                            <span className="text-xs text-slate-500">{track.duration}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

const MusicPage: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const personas = ['All', 'Raw B', 'Mr Sletner', 'Dookie Trackshoes', 'III Kings'];

    const filteredAlbums = useMemo(() => {
        if (filter === 'All') return albums;
        return albums.filter(album => album.persona === filter);
    }, [filter]);

    return (
        <div className="flex flex-col h-full">
            <Header title="Music" subtitle="Albums & Tracks" />

            <div className="p-4">
                <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                    {personas.map(p => (
                        <button
                            key={p}
                            onClick={() => setFilter(p)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                                filter === p ? 'bg-brand-primary text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
                <div className="space-y-6">
                    {filteredAlbums.map(album => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicPage;