import {
  ArrowRight,
  Heart,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
} from 'lucide-react'
import logo from '../assets/front-center-logo.png'

export default function Hero({
  cityInput,
  setCityInput,
  loading,
  handleSubmit,
  favoritesCount,
}) {
  return (
    <div className="heroContent">
      <div className="heroBadge">
        <Sparkles size={15} />
        Your all-in-one live event search
      </div>
     
      <h1>
        Your next great night
        <span> starts here.</span>
      </h1>

      <p className="subtitle">
        Discover concerts near you, compare ticket options, save your favorite
        events, and find your way to the front row.
      </p>

      <form className="searchBox" onSubmit={handleSubmit}>
        <Search className="searchIcon" size={21} />

        <input
          value={cityInput}
          onChange={(event) => setCityInput(event.target.value)}
          placeholder="Search by city, e.g. Salt Lake City"
          aria-label="Concert city"
        />

        <button type="submit" disabled={loading}>
          <span>{loading ? 'Searching...' : 'Find events'}</span>
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className="popularCities">
        <span>Popular:</span>
     

        {['Salt Lake City', 'Las Vegas', 'Denver', 'Los Angeles'].map(
          (city) => (
            <button
              key={city}
              type="button"
              onClick={() => setCityInput(city)}
            >
              {city}
            </button>
          ),
        )}
      </div>
<img
  src={logo}
  alt="Front Center Tix"
  className="heroLogo"
/>
      <div className="heroStats">
        <span>
          <Ticket size={18} />
          <span>
            <strong>40</strong>
            Events per search
          </span>
        </span>

        <span>
          <ShieldCheck size={18} />
          <span>
            <strong>3</strong>
            Ticket providers
          </span>
        </span>

        <span>
          <Heart size={18} />
          <span>
            <strong>{favoritesCount}</strong>
            Saved favorites
          </span>
        </span>
      </div>
    </div>
  )
}