import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, MapPin, CalendarDays, Ticket, Star, SlidersHorizontal, Music2, ExternalLink } from 'lucide-react';
import './styles.css';

const concerts = [
  {
    id: 1,
    artist: 'Neon Skyline',
    genre: 'Pop',
    city: 'Salt Lake City',
    venue: 'Delta Center',
    date: 'Aug 16, 2026',
    time: '7:30 PM',
    image: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    vendors: [
      { name: 'SeatGeek', price: 64, url: '#' },
      { name: 'Ticketmaster', price: 72, url: '#' },
      { name: 'StubHub', price: 69, url: '#' }
    ]
  },
  {
    id: 2,
    artist: 'The Canyon Roads',
    genre: 'Country',
    city: 'Salt Lake City',
    venue: 'Utah First Credit Union Amphitheatre',
    date: 'Sep 4, 2026',
    time: '6:45 PM',
    image: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    vendors: [
      { name: 'Vivid Seats', price: 41, url: '#' },
      { name: 'SeatGeek', price: 38, url: '#' },
      { name: 'Ticketmaster', price: 55, url: '#' }
    ]
  },
  {
    id: 3,
    artist: 'Glass Riot',
    genre: 'Rock',
    city: 'Salt Lake City',
    venue: 'The Union Event Center',
    date: 'Oct 12, 2026',
    time: '8:00 PM',
    image: 'linear-gradient(135deg, #111827, #2563eb)',
    vendors: [
      { name: 'Ticketmaster', price: 49, url: '#' },
      { name: 'AXS', price: 46, url: '#' },
      { name: 'StubHub', price: 59, url: '#' }
    ]
  },
  {
    id: 4,
    artist: 'Velvet Moon',
    genre: 'Alternative',
    city: 'Denver',
    venue: 'Red Rocks Amphitheatre',
    date: 'Aug 29, 2026',
    time: '7:00 PM',
    image: 'linear-gradient(135deg, #14b8a6, #0f172a)',
    vendors: [
      { name: 'AXS', price: 82, url: '#' },
      { name: 'SeatGeek', price: 79, url: '#' },
      { name: 'Vivid Seats', price: 91, url: '#' }
    ]
  },
  {
    id: 5,
    artist: 'Midnight Static',
    genre: 'Electronic',
    city: 'Las Vegas',
    venue: 'T-Mobile Arena',
    date: 'Nov 7, 2026',
    time: '9:00 PM',
    image: 'linear-gradient(135deg, #06b6d4, #a855f7)',
    vendors: [
      { name: 'Ticketmaster', price: 96, url: '#' },
      { name: 'SeatGeek', price: 88, url: '#' },
      { name: 'StubHub', price: 103, url: '#' }
    ]
  }
];

const genres = ['All', ...Array.from(new Set(concerts.map(c => c.genre)))];

function bestVendor(vendors) {
  return vendors.reduce((best, current) => current.price < best.price ? current : best, vendors[0]);
}

function App() {
  const [city, setCity] = useState('Salt Lake City');
  const [genre, setGenre] = useState('All');

  const results = useMemo(() => {
    const search = city.trim().toLowerCase();
    return concerts.filter(c => {
      const cityMatch = !search || c.city.toLowerCase().includes(search);
      const genreMatch = genre === 'All' || c.genre === genre;
      return cityMatch && genreMatch;
    });
  }, [city, genre]);

  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <div className="brand"><Music2 size={24}/> Concert City Finder</div>
          <a className="navLink" href="#results">Find tickets</a>
        </nav>
        <div className="heroGrid">
          <div>
            <p className="eyebrow"><Star size={16}/> One city. Every show. Best price first.</p>
            <h1>Find concerts in any city and compare ticket prices in one clean app.</h1>
            <p className="subtitle">Built for quick mobile searches and comfortable desktop browsing, with best-price cards across ticket vendors.</p>
            <div className="searchBox">
              <Search className="searchIcon" size={22}/>
              <input value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city, e.g. Salt Lake City" />
              <button onClick={() => document.getElementById('results').scrollIntoView({ behavior: 'smooth' })}>Search</button>
            </div>
          </div>
          <div className="phoneMockup">
            <div className="phoneTop"></div>
            <div className="miniCard"><span>Tonight near you</span><strong>12 shows</strong></div>
            <div className="miniPoster"></div>
            <div className="miniPrice"><Ticket size={18}/> Best from $38</div>
          </div>
        </div>
      </section>

      <section className="controls" id="results">
        <div>
          <h2>Concerts near {city || 'your city'}</h2>
          <p>{results.length} results found</p>
        </div>
        <div className="filter"><SlidersHorizontal size={18}/><select value={genre} onChange={e => setGenre(e.target.value)}>{genres.map(g => <option key={g}>{g}</option>)}</select></div>
      </section>

      <section className="grid">
        {results.map(concert => {
          const best = bestVendor(concert.vendors);
          return <article className="card" key={concert.id}>
            <div className="art" style={{ background: concert.image }}>
              <span>{concert.genre}</span>
              <Music2 size={54}/>
            </div>
            <div className="cardBody">
              <div className="topLine"><span className="badge">Best price ${best.price}</span><span className="vendor">{best.name}</span></div>
              <h3>{concert.artist}</h3>
              <p className="meta"><CalendarDays size={17}/> {concert.date} • {concert.time}</p>
              <p className="meta"><MapPin size={17}/> {concert.venue}, {concert.city}</p>
              <div className="vendors">
                {concert.vendors.sort((a,b)=>a.price-b.price).map(v => <a href={v.url} key={v.name} className={v.name === best.name ? 'vendorRow best' : 'vendorRow'}>
                  <span>{v.name}</span><strong>${v.price}</strong><ExternalLink size={14}/>
                </a>)}
              </div>
            </div>
          </article>
        })}
      </section>

      {results.length === 0 && <div className="empty">No sample concerts found. Try Salt Lake City, Denver, or Las Vegas.</div>}

      <footer>Demo app with sample data. Connect authorized ticket APIs to show live inventory and pricing.</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
