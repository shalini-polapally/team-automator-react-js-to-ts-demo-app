import React from "react";

function FilterButtons({ currentFilter, onChange }) {
  const filters = [
    { label: "All", testId: "filter-all" },
    { label: "Active", testId: "filter-active" },
    { label: "Completed", testId: "filter-completed" },
  ];

  return (
    <div style={{ marginTop: "10px" }} className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter.testId}
          onClick={() => onChange(filter.label)}
          data-testid={filter.testId}
          className={filter.label === currentFilter ? "active" : null}
          style={{ marginRight: "5px" }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
