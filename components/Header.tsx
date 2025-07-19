
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="p-4 bg-brand-bg/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-800">
      <h1 className="text-2xl font-bold tracking-tight text-brand-light font-orbitron">{title}</h1>
      {subtitle && <p className="text-sm text-brand-secondary">{subtitle}</p>}
    </header>
  );
};

export default Header;
