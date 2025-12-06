import React, { useState, useRef } from 'react';
import searchApi from '../apis/search';
import '../styles/SearchModal.scss';

const TABS = [
  { key: 'tv-movies', label: 'TV / Movies' },
  { key: 'books', label: 'Books' },
  { key: 'games', label: 'Games' },
];

export interface SearchResult {
  id: string | number;
  title: string;
  image?: string;
  [key: string]: any;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (result: SearchResult) => void;
  loading?: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelect, loading: externalLoading }) => {
  if (!isOpen) return null;
  const [activeTab, setActiveTab] = useState('tv-movies');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ [tab: string]: SearchResult[] }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);


  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setError(null);
    // If we have a cached result for this tab and query, do not re-fetch
    if (results[tab] && results[tab].length > 0) return;
    if (query.length >= 3) runSearch(tab, query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setError(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length >= 3) {
      debounceRef.current = setTimeout(() => {
        runSearch(activeTab, value);
      }, 750);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If enter and doesn't have any cached results, then fetch
    if (e.key === 'Enter' && (!results[activeTab] || results[activeTab].length === 0)) {
      runSearch(activeTab, query);
    }
  };

  const runSearch = async (tab: string, q: string) => {
    setLoading(true);
    setError(null);
    try {
      let res: SearchResult[] = [];
      if (tab === 'tv-movies') {
        // Use the real search API for TV/Movies
        const apiResults = await searchApi(q);
        // The first item is the query string, skip it
        res = apiResults.slice(1).map((item: any) => ({
          id: item.id,
          title: item.title || item.name,
          image: item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : undefined,
          ...item
        }));
      } else if (tab === 'books') {
        res = [
          { id: 2, title: 'Example Book', image: 'https://via.placeholder.com/80' },
        ];
      } else if (tab === 'games') {
        res = [
          { id: 3, title: 'Example Game', image: 'https://via.placeholder.com/80' },
        ];
      }
      setResults(prev => ({ ...prev, [tab]: res }));
    } catch (err: any) {
      setError('Search failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-modal-overlay">
      <div className="search-modal">
        <div className="search-modal-header">
          <input
            className="search-input"
            type="text"
            placeholder={`Search ${TABS.find(t => t.key === activeTab)?.label}...`}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={activeTab === tab.key ? 'active' : ''}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {error && <div className="error">{error}</div>}
        <div className="results">
          {(!results[activeTab] || !results[activeTab].length) && (
            <div className="no-search-message">
              {(loading || externalLoading) ? 'Fetching results...' : 'Type to search.'}
            </div>
          )}
          {(results[activeTab] || []).map(result => {
            // Format title as 'title (TV / Movie, YEAR)'
            const year = (result.release_date || result.first_air_date || '').split('-')[0];
            let typeLabel = '';
            if (result.media_type === 'tv') typeLabel = 'TV';
            else if (result.media_type === 'movie') typeLabel = 'Movie';
            else typeLabel = '';
            const displayTitle = `${result.title} ${typeLabel ? `(${typeLabel}${year ? `, ${year}` : ''})` : year ? `(${year})` : ''}`;
            const description = result.overview || result.description || '';
            return (
              <div key={result.id} className="result-item" onClick={() => !externalLoading && onSelect(result)} style={{ opacity: externalLoading ? 0.6 : 1, pointerEvents: externalLoading ? 'none' : 'auto' }}>
                <img
                  src={result.image || 'https://via.placeholder.com/80?text=No+Image'}
                  alt={result.title}
                  style={{ background: '#eee' }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 'bold' }}>{displayTitle}</span>
                  {description && (
                    <div className="result-description" style={{ fontSize: '0.95em', color: '#666', marginTop: '0.2em' }}>{description}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
