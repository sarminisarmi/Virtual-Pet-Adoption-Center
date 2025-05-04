import React from 'react';

const FilterBar = ({ onFilter }) => {
  return (
    <div className="filter-bar">
      <button onClick={() => onFilter('happy')}>Happy</button>
      <button onClick={() => onFilter('sad')}>Sad</button>
      <button onClick={() => onFilter('playful')}>Playful</button>
      <button onClick={() => onFilter('all')}>All</button>
    </div>
  );
};

export default FilterBar;
