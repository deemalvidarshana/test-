import React, { useState } from 'react';
import Modal from './Modal';

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-desc', label: 'Price (High to Low, LKR)' },
  { value: 'price-asc', label: 'Price (Low to High, LKR)' }
];

function FilterModal({ open, onClose, onSort }) {
  const [selected, setSelected] = useState('');

  if (!open) return null;

  return (
    <Modal title="Sort Options" onClose={onClose}>
      <div className="modal-form">
        <label>
          Sort by:
          <select
            className="modal-input"
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
            <option value="">Select</option>
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
        <button
          className="modal-btn filter"
          style={{ marginTop: 16 }}
          disabled={!selected}
          onClick={() => {
            onSort(selected);
            onClose();
          }}
        >
          Apply Sort
        </button>
      </div>
    </Modal>
  );
}

export default FilterModal;
