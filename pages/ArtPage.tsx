
import React from 'react';
import Header from '../components/Header';

const ArtPage: React.FC = () => {
    return (
        <div>
            <Header title="Art" subtitle="Portfolio & Projects" />
            <div className="p-4 space-y-8">
                 <div>
                    <p className="text-slate-300 mb-4 text-center">
                        A live look at the artist's visual work from Behance.
                    </p>
                    <div className="mx-auto" style={{maxWidth: '430px'}}>
                        <iframe
                            title="Behance Art Portfolio"
                            src="https://www.behance.net/embed/service/602257?ilo0=1"
                            height="450"
                            width="100%"
                            allowFullScreen
                            loading="lazy"
                            frameBorder="0"
                            allow="clipboard-write"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ display: 'block', margin: '0 auto' }}
                        ></iframe>
                    </div>
                </div>

                <div>
                    <p className="text-slate-300 mb-4 text-center">
                        Featured Project
                    </p>
                    <div className="mx-auto" style={{maxWidth: '404px'}}>
                         <iframe
                            title="Behance Featured Project"
                            src="https://www.behance.net/embed/project/230677041?ilo0=1"
                            height="316"
                            width="100%"
                            allowFullScreen
                            loading="lazy"
                            frameBorder="0"
                            allow="clipboard-write"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ display: 'block', margin: '0 auto' }}
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtPage;
