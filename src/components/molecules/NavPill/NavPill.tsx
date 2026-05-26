import React, { useState } from 'react';
import './NavPill.css';

interface NavPillItem {
  id: string;
  label: string;
}

interface NavPillProps {
  items: NavPillItem[];
  onSelect?: (id: string) => void;
}

export const NavPill: React.FC<NavPillProps> = ({ items, onSelect }) => {
  const [activeId, setActiveId] = useState(items[0]?.id || '');

  const handleClick = (id: string) => {
    setActiveId(id);
    onSelect?.(id);
  };

  return (
    <div className="nav-pill-container">
      {items.map((item) => (
        <button
          key={item.id}
          className={`nav-pill ${activeId === item.id ? 'active' : ''}`}
          onClick={() => handleClick(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
