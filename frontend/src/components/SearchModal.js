import React from 'react';
import Modal from './Modal';

function SearchModal({
  open,
  onClose,
  from,
  setFrom,
  to,
  setTo,
  name,
  setName,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  onApply
}) {
  if (!open) return null;

  return (
    <Modal title="Search" onClose={onClose}>
      <div className="modal-form">
        <label>
          From:
          <input
            type="text"
            value={from}
            onChange={e => setFrom(e.target.value)}
            placeholder="Enter origin"
            className="modal-input"
          />
        </label>
        <label>
          To:
          <input
            type="text"
            value={to}
            onChange={e => setTo(e.target.value)}
            placeholder="Enter destination"
            className="modal-input"
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name"
            className="modal-input"
          />
        </label>
        <label>
          Date From:
          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="modal-input"
          />
        </label>
        <label>
          Date To:
          <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="modal-input"
          />
        </label>
        <button className="modal-btn search" onClick={onApply}>🔍 Search</button>
      </div>
    </Modal>
  );
}

export default SearchModal;
