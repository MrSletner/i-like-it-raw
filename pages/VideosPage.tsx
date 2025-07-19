
import React from 'react';
import Header from '../components/Header';

const VideosPage: React.FC = () => {
    return (
        <div>
            <Header title="Videos" subtitle="Music Videos & More" />
            <div className="p-4">
                <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/videoseries?si=HDEzUjIbsK_zZO-7&list=PLAmRj0EHmfW6iEwf8UCv6X93ukqr_tZv6"
                        title="YouTube video player playlist"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default VideosPage;