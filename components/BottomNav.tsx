
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { HomeIcon, MusicIcon, VideoIcon, ArtIcon, StoreIcon } from '../constants/icons';

const BottomNav: React.FC = () => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/music', label: 'Music', icon: MusicIcon },
    { path: '/videos', label: 'Videos', icon: VideoIcon },
    { path: '/art', label: 'Art', icon: ArtIcon },
    { path: '/store', label: 'Store', icon: StoreIcon },
  ];

  const activeLinkClass = 'text-brand-primary';
  const inactiveLinkClass = 'text-brand-secondary hover:text-brand-light';

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-sm border-t border-slate-800 max-w-lg mx-auto">
      <div className="flex justify-around items-center h-full">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`
            }
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
              {item.path === '/store' && itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-brand-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
