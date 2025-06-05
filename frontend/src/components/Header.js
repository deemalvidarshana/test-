import React from 'react';

// SVG for filter icon
const FilterIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF0745"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="21" x2="20" y2="21" />
    <line x1="8" y1="17" x2="16" y2="17" />
    <line x1="10" y1="13" x2="14" y2="13" />
    <line x1="12" y1="3" x2="12" y2="13" />
  </svg>
);

function Header({ onFilter, onSearchClick }) {
  return (
    <div className="header">
      <div className="menu-vertical">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="header-actions">
        <button className="header-btn search-btn" onClick={onSearchClick}>
          SEARCH
        </button>
        <button className="header-btn filter-btn" onClick={onFilter}>
          <FilterIcon />
          FILTER
        </button>
      </div>
    </div>
  );
}

export default Header;
