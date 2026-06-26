import React, { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .voter-root {
    min-height: 100vh;
    background: #f5f3ef;
    background-image:
      radial-gradient(ellipse at 10% 0%, rgba(59,130,246,0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 90% 100%, rgba(16,185,129,0.05) 0%, transparent 50%);
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px 80px;
  }

  .voter-header {
    text-align: center;
    margin-bottom: 44px;
  }

  .voter-badge {
    display: inline-block;
    background: #e8f0fe;
    border: 1px solid #c7d7fc;
    color: #3b62d8;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 18px;
  }

  .voter-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(36px, 6vw, 58px);
    font-weight: 400;
    line-height: 1.1;
    color: #111;
    letter-spacing: -0.5px;
  }

  .voter-title em {
    font-style: italic;
    color: #3b62d8;
  }

  .voter-subtitle {
    margin-top: 12px;
    font-size: 15px;
    color: #888;
    font-weight: 300;
  }

  .search-box {
    width: 100%;
    max-width: 620px;
    margin-bottom: 44px;
  }

  .search-inner {
    display: flex;
    background: #fff;
    border: 1.5px solid #e0dcd6;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .search-inner:focus-within {
    border-color: #3b62d8;
    box-shadow: 0 0 0 3px rgba(59,98,216,0.1);
  }

  .search-icon {
    display: flex;
    align-items: center;
    padding: 0 14px 0 18px;
    color: #aaa;
    font-size: 17px;
    flex-shrink: 0;
  }

  .search-input {
    flex: 1;
    height: 54px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    color: #111;
  }

  .search-input::placeholder { color: #bbb; }

  .search-btn {
    height: 54px;
    padding: 0 28px;
    background: #1e2d6b;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    flex-shrink: 0;
  }

  .search-btn:hover { background: #2a3f96; }
  .search-btn:active { transform: scale(0.98); }

  .status-loading {
    color: #888;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid #e0dcd6;
    border-top-color: #3b62d8;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .status-error {
    background: #fff5f5;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 14px 20px;
    border-radius: 10px;
    font-size: 14px;
    max-width: 620px;
    width: 100%;
  }

  .results-wrapper {
    width: 100%;
    max-width: 760px;
  }

  .results-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .results-count {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: #111;
  }

  .results-pill {
    background: #e8f0fe;
    color: #3b62d8;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 100px;
  }

  .voter-card {
    background: #fff;
    border: 1.5px solid #ebe8e2;
    border-radius: 16px;
    margin-bottom: 16px;
    overflow: hidden;
    animation: fadeUp 0.35s ease both;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  .voter-card:hover {
    border-color: #c7d7fc;
    box-shadow: 0 6px 24px rgba(59,98,216,0.09);
    transform: translateY(-2px);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .card-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
    border-bottom: 1px solid #f0ece6;
    background: #faf9f7;
  }

  .card-name {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: #111;
  }

  .card-voter-id {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #3b62d8;
    background: #e8f0fe;
    padding: 5px 12px;
    border-radius: 6px;
    text-transform: uppercase;
    border: 1px solid #c7d7fc;
  }

  .card-body {
    padding: 22px 24px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 18px 28px;
  }

  .field { display: flex; flex-direction: column; gap: 4px; }

  .field-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: #aaa;
  }

  .field-value {
    font-size: 15px;
    color: #444;
    line-height: 1.4;
  }

  .field-value.highlight {
    color: #111;
    font-weight: 500;
  }

  .card-footer {
    padding: 14px 24px;
    border-top: 1px solid #f0ece6;
    display: flex;
    align-items: center;
    gap: 10px;
    background: #faf9f7;
  }

  .badge-valid {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #059669;
    background: #d1fae5;
    border: 1px solid #a7f3d0;
    padding: 5px 12px;
    border-radius: 100px;
  }

  .badge-invalid {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #dc2626;
    background: #fee2e2;
    border: 1px solid #fecaca;
    padding: 5px 12px;
    border-radius: 100px;
  }

  .badge-gender {
    font-size: 12px;
    font-weight: 500;
    color: #666;
    background: #f3f4f6;
    padding: 5px 12px;
    border-radius: 100px;
    border: 1px solid #e5e7eb;
  }

  .no-results {
    text-align: center;
    padding: 60px 20px;
    color: #aaa;
    font-size: 16px;
  }

  .divider {
    width: 40px;
    height: 1px;
    background: #e5e7eb;
    margin: 0 auto 20px;
  }
`;

const FIELD_MAP = [
  { key: 'voter no', label: 'Voter No.', highlight: true },
  { key: 'Father Name', label: "Father's Name" },
  { key: 'Age', label: 'Age' },
  { key: 'House Number', label: 'House No.' },
  { key: 'Section No', label: 'Section No.' },
  { key: 'Section Name', label: 'Section Name' },
  { key: 'Part No', label: 'Part No.' },
  { key: 'Assembly Constituency No', label: 'AC No.' },
  { key: 'Assembly Constituency Name', label: 'Constituency' },
  { key: 'Mother Name', label: "Mother's Name" },
  { key: 'Husband Name', label: "Husband's Name" },
];

const VoterCard = ({ source, index }) => {
  const name = source['Name'] || 'Unknown Voter';
  const voterId = source['Voter ID'] || '—';
  const gender = source['Gender'] || '';
  const vote = (source['vote'] || '').toLowerCase();
  const isValid = vote === 'valid';

  const visibleFields = FIELD_MAP.filter(f => {
    const val = source[f.key];
    return val !== undefined && val !== null && val !== '';
  });

  return (
    <div className="voter-card" style={{ animationDelay: `${index * 0.07}s` }}>
      <div className="card-topbar">
        <span className="card-name">{name}</span>
        <span className="card-voter-id">{voterId}</span>
      </div>
      <div className="card-body">
        {visibleFields.map(f => (
          <div className="field" key={f.key}>
            <span className="field-label">{f.label}</span>
            <span className={`field-value${f.highlight ? ' highlight' : ''}`}>
              {source[f.key] || '—'}
            </span>
          </div>
        ))}
      </div>
      <div className="card-footer">
        <span className={isValid ? 'badge-valid' : 'badge-invalid'}>
          {isValid ? '✓ Valid Voter' : '✗ Invalid'}
        </span>
        {gender && <span className="badge-gender">👤 {gender}</span>}
      </div>
    </div>
  );
};

const Voter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setResults([]);
    setSearched(false);
    try {
      const response = await fetch(
        `https://localhost:9200/voters/_search?q=Name:"${searchQuery}"&pretty`,
        { headers: { Authorization: 'Basic ' + btoa('elastic:QudCDs099oZqMeF7nbf0') } }
      );
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const data = await response.json();
      setResults(data.hits?.hits || []);
      setSearched(true);
    } catch (err) {
      setError('Failed to fetch data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="voter-root">
        <div className="voter-header">
          <div className="voter-badge">Official Electoral Registry</div>
          <h1 className="voter-title">Voter <em>Search</em></h1>
          <p className="voter-subtitle">Search by name to retrieve voter details instantly</p>
        </div>

        <div className="search-box">
          <div className="search-inner">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Enter voter name…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-btn" onClick={handleSearch}>Search</button>
          </div>
        </div>

        {loading && (
          <div className="status-loading">
            <span className="spinner" /> Searching registry…
          </div>
        )}
        {error && <div className="status-error">⚠ {error}</div>}

        {!loading && !error && results.length > 0 && (
          <div className="results-wrapper">
            <div className="results-header">
              <span className="results-count">Results</span>
              <span className="results-pill">{results.length} found</span>
            </div>
            {results.map((hit, i) => (
              <VoterCard key={hit._id || i} source={hit._source} index={i} />
            ))}
          </div>
        )}

        {!loading && !error && searched && results.length === 0 && (
          <div className="no-results">
            <div className="divider" />
            No voters found for "{searchQuery}"
          </div>
        )}
      </div>
    </>
  );
};

export default Voter;