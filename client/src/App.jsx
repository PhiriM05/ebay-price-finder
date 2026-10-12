import { useState } from 'react';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [cheapest, setCheapest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(event) {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setError('Please enter an item name.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(trimmed)}`);

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error || 'Search failed.');
      }

      const data = await response.json();
      setResults(data.items || []);
      setCheapest(data.cheapest || null);
    } catch (searchError) {
      setError(searchError.message || 'Could not search eBay right now.');
      setResults([]);
      setCheapest(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">Official eBay API</span>
          <h1>eBay Price Finder</h1>
        </div>
      </header>

      <main className="content">
        <form className="search-panel" onSubmit={handleSearch}>
          <label htmlFor="query">What item are you looking for?</label>
          <div className="search-row">
            <input
              id="query"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Example: AirPods Pro, Nintendo Switch, iPhone 15"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Find Cheapest'}
            </button>
          </div>
        </form>

        {error && <div className="alert error">{error}</div>}

        {cheapest && (
          <section className="summary-card">
            <div>
              <span className="summary-label">Cheapest offer</span>
              <h2>{cheapest.title}</h2>
            </div>

            <div className="summary-price-row">
              <div>
                <span className="summary-label">Price</span>
                <strong>{formatCurrency(cheapest.totalPrice)}</strong>
              </div>
              <div>
                <span className="summary-label">Item price</span>
                <strong>{formatCurrency(cheapest.price)}</strong>
              </div>
              <div>
                <span className="summary-label">Shipping</span>
                <strong>{formatCurrency(cheapest.shippingCost)}</strong>
              </div>
            </div>

            <a href={cheapest.url} target="_blank" rel="noreferrer">
              View listing on eBay
            </a>
          </section>
        )}

        <section className="results-panel">
          <div className="results-header">
            <h3>Results</h3>
            {results.length > 0 && <span>{results.length} listings</span>}
          </div>

          {results.length === 0 && !loading && !error && (
            <div className="empty-state">
              Search for an item to see the cheapest eBay offers.
            </div>
          )}

          <div className="result-list">
            {results.map((item) => (
              <article key={item.itemId || item.title} className="result-card">
                <img
                  src={item.image || 'https://via.placeholder.com/160x120?text=eBay'}
                  alt={item.title}
                  onError={(event) => {
                    event.currentTarget.src = 'https://via.placeholder.com/160x120?text=eBay';
                  }}
                />

                <div className="result-body">
                  <div className="result-topline">
                    <span className="tag">{item.condition}</span>
                    <span className="location">{item.location}</span>
                  </div>

                  <h4>{item.title}</h4>

                  <div className="price-row">
                    <strong>{formatCurrency(item.totalPrice)}</strong>
                    <span>Item: {formatCurrency(item.price)}</span>
                    <span>Shipping: {formatCurrency(item.shippingCost)}</span>
                  </div>

                  <div className="meta-row">
                    <span>Seller: {item.seller}</span>
                    <span>{item.listingType}</span>
                  </div>

                  <a href={item.url} target="_blank" rel="noreferrer">
                    Open listing
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
