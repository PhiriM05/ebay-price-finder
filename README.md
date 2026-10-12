* {
  box-sizing: border-box;
}

:root {
  font-family: Inter, 'Segoe UI', sans-serif;
  background: #f4f7fb;
  color: #14213d;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fbff 0%, #eef2ff 100%);
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input {
  font: inherit;
}

img {
  max-width: 100%;
  display: block;
}

.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 56px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.eyebrow {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
  color: #4f46e5;
  font-weight: 700;
  margin-bottom: 8px;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.content {
  display: grid;
  gap: 24px;
}

.search-panel,
.summary-card,
.results-panel {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(20, 33, 61, 0.08);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(61, 79, 125, 0.08);
}

.search-panel {
  padding: 20px;
}

.search-panel label {
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
}

.search-row {
  display: flex;
  gap: 12px;
}

.search-row input {
  flex: 1;
  min-height: 52px;
  border-radius: 12px;
  border: 1px solid #dbe3f0;
  padding: 0 16px;
  font-size: 1rem;
  background: #fff;
}

.search-row button {
  min-width: 180px;
  min-height: 52px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #4f46e5, #4338ca);
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.search-row button:hover {
  opacity: 0.96;
}

.search-row button:disabled {
  opacity: 0.7;
  cursor: wait;
}

.alert {
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 600;
}

.alert.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.summary-card {
  padding: 20px;
}

.summary-card h2 {
  margin: 8px 0 12px;
  font-size: clamp(1.3rem, 2vw, 2rem);
}

.summary-label {
  display: block;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
  font-weight: 700;
}

.summary-price-row {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 18px;
}

.summary-price-row strong {
  font-size: clamp(1.2rem, 2vw, 1.8rem);
}

.summary-card a,
.result-card a {
  color: #4f46e5;
  font-weight: 700;
}

.results-panel {
  padding: 20px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.results-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.results-header span {
  color: #64748b;
  font-weight: 600;
}

.empty-state {
  padding: 32px 16px;
  text-align: center;
  color: #64748b;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
}

.result-list {
  display: grid;
  gap: 16px;
}

.result-card {
  display: flex;
  gap: 18px;
  padding: 14px;
  border: 1px solid #edf2f7;
  border-radius: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.result-card img {
  width: 160px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  background: #e2e8f0;
}

.result-body {
  flex: 1;
  min-width: 0;
}

.result-topline,
.meta-row,
.price-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
}

.result-topline {
  margin-bottom: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 0.72rem;
  font-weight: 700;
  background: #e0e7ff;
  color: #3730a3;
}

.location {
  font-size: 0.82rem;
  color: #64748b;
}

.result-body h4 {
  margin: 0 0 10px;
  font-size: 1.1rem;
  line-height: 1.4;
}

.price-row {
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: #475569;
}

.price-row strong {
  color: #0f172a;
  font-size: 1.4rem;
}

.meta-row {
  margin-bottom: 10px;
  font-size: 0.82rem;
  color: #64748b;
}

@media (max-width: 700px) {
  .search-row,
  .result-card {
    flex-direction: column;
  }

  .search-row button {
    width: 100%;
  }

  .result-card img {
    width: 100%;
    height: auto;
  }
}
