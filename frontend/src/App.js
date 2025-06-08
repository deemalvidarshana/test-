import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import FilterModal from './components/FilterModal';
import SearchModal from './components/SearchModal';
import './App.css';

//const BACKEND_URL = 'http://localhost:4000/api/sheet';
const BACKEND_URL = 'https://test-production-7f4a.up.railway.app/api/sheet';

function App() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Search fields
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchDateFrom, setSearchDateFrom] = useState('');
  const [searchDateTo, setSearchDateTo] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(BACKEND_URL)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((row, idx) => ({
          id: idx + 1,
          name: row.name || '',
          date: row.date || row.name || '',
          type: row.type || row.type || '',
          from: row.from || row.from ||  '',
          to: row.to || row.to || '',
          // description: row.description || row.description || '',
          availability: row.availability || row.availability || '',
          time: row.time || row.time || '',
          price: row.price || ''
        }));
        setRows(mapped);
        setFilteredRows(mapped);
        setError(null);
      })
      .catch(err => {
        setError('Error loading data: ' + err.message);
        setRows([]);
        setFilteredRows([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Robust date range comparison
  function isInRange(date, from, to) {
    if (!date) return false;
    const d = new Date(date);
    if (from && d < new Date(from)) return false;
    if (to && d > new Date(to)) return false;
    return true;
  }

  // Sorting logic (for FilterModal)
  const handleSort = (sortOption) => {
    let sorted = [...filteredRows];
    if (sortOption === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'price-asc') {
      sorted.sort((a, b) => extractLKR(a.price) - extractLKR(b.price));
    } else if (sortOption === 'price-desc') {
      sorted.sort((a, b) => extractLKR(b.price) - extractLKR(a.price));
    }
    setFilteredRows(sorted);
  };

  // Helper to extract Sri Lankan rupees as a number from price string
  function extractLKR(price) {
    if (!price) return 0;
    const match = price.replace(/,/g, '').match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  }

  // Search logic
  const handleSearch = () => {
    let temp = [...rows];
    if (searchFrom.trim()) {
      temp = temp.filter(row =>
        row.rideFrom.toLowerCase().includes(searchFrom.trim().toLowerCase())
      );
    }
    if (searchTo.trim()) {
      temp = temp.filter(row =>
        row.rideTo.toLowerCase().includes(searchTo.trim().toLowerCase())
      );
    }
    if (searchName.trim()) {
      temp = temp.filter(row =>
        row.name.toLowerCase().includes(searchName.trim().toLowerCase())
      );
    }
    if (searchDateFrom || searchDateTo) {
      temp = temp.filter(row => isInRange(row.date, searchDateFrom, searchDateTo));
    }
    setFilteredRows(temp);
    setShowSearch(false);
  };

  return (
    <div className="app">
      <div className="title">TITLE</div>
      <Header
        onFilter={() => setShowFilter(true)}
        onSearchClick={() => setShowSearch(true)}
      />
      <div className="table-container">
        {loading ? (
          <div style={{ padding: 20 }}>Loading data...</div>
        ) : error ? (
          <div style={{ color: 'red', padding: 20 }}>{error}</div>
        ) : filteredRows.length === 0 ? (
          <div style={{ padding: 20 }}>No matching records found</div>
        ) : (
          <Table rows={filteredRows} />
        )}
      </div>

      <FilterModal
        open={showFilter}
        onClose={() => setShowFilter(false)}
        onSort={handleSort}
      />

      <SearchModal
        open={showSearch}
        onClose={() => setShowSearch(false)}
        from={searchFrom}
        setFrom={setSearchFrom}
        to={searchTo}
        setTo={setSearchTo}
        name={searchName}
        setName={setSearchName}
        dateFrom={searchDateFrom}
        setDateFrom={setSearchDateFrom}
        dateTo={searchDateTo}
        setDateTo={setSearchDateTo}
        onApply={handleSearch}
      />
    </div>
  );
}

export default App;
