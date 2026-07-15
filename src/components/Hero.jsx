import { Search, Star } from 'lucide-react'
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
      <img
        src={logo}
        alt="Front Center Tix"
        className="heroLogo"
      />

      <p className="eyebrow">
        <Star size={16} />
        One Pass. All The Live.
      </p>

      <h1>Find your next unforgettable live event.</h1>

      <p className="subtitle">
        Search concerts by city, compare ticket options, save favorites, and
        jump directly to Ticketmaster, SeatGeek, or StubHub.
      </p>

      <form className="searchBox" onSubmit={handleSubmit}>
        <Search className="searchIcon" size={21} />

        <input
          value={cityInput}
          onChange={(event) => setCityInput(event.target.value)}
          placeholder="Enter a city, e.g. Salt Lake City"
          aria-label="Concert city"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search concerts'}
        </button>
      </form>

      <div className="heroStats">
        <span>
          <strong>40</strong> results per search
        </span>

        <span>
          <strong>3</strong> ticket providers
        </span>

        <span>
          <strong>{favoritesCount}</strong> saved favorites
        </span>
      </div>
    </div>
  )
}