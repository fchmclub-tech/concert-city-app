import { useEffect, useMemo, useState } from 'react'
import {
  CalendarDays,
  ExternalLink,
  Heart,
  LoaderCircle,
  MapPin,
  SlidersHorizontal,
} from 'lucide-react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Categories from './components/Categories.jsx'
import FeaturedConcert from './components/FeaturedConcert.jsx'
import TrendingConcerts from './components/TrendingConcerts.jsx'
import PriceComparisonCard from './components/PriceComparisonCard.jsx'
import Footer from './components/Footer.jsx'
const genres = [
  'All',
  'Rock',
  'Pop',
  'Country',
  'Hip-Hop/Rap',
  'Alternative',
  'Electronic',
  'R&B',
  'Metal',
]

function formatDate(dateValue) {
  if (!dateValue) return 'Date unavailable'

  return new Date(`${dateValue}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatTime(timeValue) {
  if (!timeValue) return 'Time TBA'

  return new Date(`2000-01-01T${timeValue}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function chooseImage(images = []) {
  const preferred =
    images.find((image) => image.ratio === '16_9' && image.width >= 640) ||
    images.find((image) => image.ratio === '16_9') ||
    images[0]

  return preferred?.url || null
}

function transformEvent(event) {
  const venue = event._embedded?.venues?.[0]
  const classification = event.classifications?.[0]
  const priceRange = event.priceRanges?.[0]

 return {
  id: event.id,
  artist: event.name || 'Concert',

  genre:
    classification?.genre?.name ||
    classification?.segment?.name ||
    'Music',

  city: venue?.city?.name || '',
  state: venue?.state?.stateCode || '',
  venue: venue?.name || 'Venue TBA',

  date: formatDate(event.dates?.start?.localDate),
  time: formatTime(event.dates?.start?.localTime),

  image: chooseImage(event.images),

  ticketUrl: event.url || '#',

  minimumPrice: priceRange?.min ?? null,

  providers: {
    ticketmaster: {
      price: priceRange?.min ?? null,
      url: event.url || '#',
    },

    seatgeek: null,

    stubhub: null,

    vividseats: null,

    tickpick: null,
  },
}
  }


export default function App() {
  const [cityInput, setCityInput] = useState('Salt Lake City')
  const [searchedCity, setSearchedCity] = useState('Salt Lake City')
  const [genre, setGenre] = useState('All')
  const [concerts, setConcerts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [error, setError] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('frontCenterTixFavorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('frontCenterTixFavorites', JSON.stringify(favorites))
  }, [favorites])

  const displayedConcerts = useMemo(() => {
    if (!showFavoritesOnly) return concerts
    return concerts.filter((concert) => favorites.includes(concert.id))
  }, [concerts, favorites, showFavoritesOnly])

  function toggleFavorite(concertId) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(concertId)
        ? currentFavorites.filter((id) => id !== concertId)
        : [...currentFavorites, concertId],
    )
  }

  async function searchConcerts(
    cityToSearch = cityInput,
    genreToSearch = genre,
  ) {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY
    const cleanCity = cityToSearch.trim()

    if (!cleanCity) {
      setError('Enter a city before searching.')
      return
    }

    if (!apiKey) {
      setError(
        'Ticketmaster API key not found. Add VITE_TICKETMASTER_API_KEY to your .env file.',
      )
      return
    }

    setLoading(true)
    setError('')
    setSearchedCity(cleanCity)

    const params = new URLSearchParams({
      apikey: apiKey,
      city: cleanCity,
      countryCode: 'US',
      classificationName: 'music',
      size: '40',
      sort: 'date,asc',
    })

    if (genreToSearch !== 'All') {
      params.set('keyword', genreToSearch)
    }

    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?${params.toString()}`,
      )

      if (!response.ok) {
        throw new Error(`Ticketmaster returned error ${response.status}.`)
      }

      const data = await response.json()
      let events = (data._embedded?.events || []).map(transformEvent)

      if (genreToSearch !== 'All') {
        const selected = genreToSearch.toLowerCase()
        events = events.filter((concert) =>
          concert.genre.toLowerCase().includes(selected),
        )
      }

      setConcerts(events)
    } catch (requestError) {
      console.error(requestError)
      setConcerts([])
      setError(
        'Concerts could not be loaded. Check your API key and internet connection, then try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchConcerts('Salt Lake City', 'All')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    setShowFavoritesOnly(false)
    searchConcerts(cityInput, genre)

    document
      .getElementById('results')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleGenreChange(event) {
    const nextGenre = event.target.value
    setGenre(nextGenre)
    setShowFavoritesOnly(false)
    searchConcerts(searchedCity, nextGenre)
  }

  return (
    <main>
      <section className="hero">
        <Header
          currentPage={currentPage}
          onShowHome={() => {
            setCurrentPage('home')
            setShowFavoritesOnly(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onShowTickets={() => {
            setCurrentPage('tickets')
            setShowFavoritesOnly(false)
            document
              .getElementById('results')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
          onShowFavorites={() => {
            setCurrentPage('favorites')
            setShowFavoritesOnly(true)
            document
              .getElementById('results')
              ?.scrollIntoView({ behavior: 'smooth' })
          }}
        />

        <Hero
          cityInput={cityInput}
          setCityInput={setCityInput}
          loading={loading}
          handleSubmit={handleSubmit}
          favoritesCount={favorites.length}
        />
      </section>

    <FeaturedConcert concerts={concerts} />

<TrendingConcerts concerts={concerts} />

<Categories
  selectedCategory={genre}
  onSelectCategory={(selectedGenre) => {
    setGenre(selectedGenre)
    setShowFavoritesOnly(false)
    searchConcerts(searchedCity, selectedGenre)

    setTimeout(() => {
      document
        .getElementById('results')
        ?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }}
/>

<section className="resultsWrap" id="results">
        <div className="controls">
          <div>
            <p className="sectionLabel">
              {showFavoritesOnly ? 'Your saved events' : 'Upcoming events'}
            </p>

            <h2>
              {showFavoritesOnly
                ? 'Favorite concerts'
                : `Concerts near ${searchedCity}`}
            </h2>

            <p>
              {loading
                ? 'Searching for concerts...'
                : `${displayedConcerts.length} results found`}
            </p>
          </div>

          <div className="filterGroup">
            <button
              type="button"
              className={`favoritesFilter ${
                showFavoritesOnly ? 'active' : ''
              }`}
              onClick={() => setShowFavoritesOnly((current) => !current)}
            >
              <Heart
                size={18}
                fill={showFavoritesOnly ? 'currentColor' : 'none'}
              />
              Favorites ({favorites.length})
            </button>

            <label className="filter">
              <SlidersHorizontal size={18} />
              <select value={genre} onChange={handleGenreChange}>
                {genres.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {loading && (
          <div className="empty">
            <LoaderCircle className="loadingIcon" size={34} />
            Loading live concerts...
          </div>
        )}

        {!loading && error && <div className="empty errorBox">{error}</div>}

        {!loading && !error && displayedConcerts.length > 0 && (
          <section className="grid">
            {displayedConcerts.map((concert) => {
              const favorite = favorites.includes(concert.id)

              return (
                <article className="card" key={concert.id}>
                  <button
                    type="button"
                    className={`favoriteButton ${
                      favorite ? 'favorited' : ''
                    }`}
                    onClick={() => toggleFavorite(concert.id)}
                    aria-label={
                      favorite
                        ? `Remove ${concert.artist} from favorites`
                        : `Add ${concert.artist} to favorites`
                    }
                    title={
                      favorite
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                  >
                    <Heart
                      size={22}
                      fill={favorite ? 'currentColor' : 'none'}
                    />
                  </button>

                  <div
                    className="art"
                    style={
                      concert.image
                        ? {
                            backgroundImage: `linear-gradient(rgba(9,11,22,.08), rgba(9,11,22,.78)), url("${concert.image}")`,
                          }
                        : {
                            background:
                              'linear-gradient(135deg, #7c3aed, #ec4899)',
                          }
                    }
                  >
                    <span>{concert.genre}</span>
                  </div>

                  <div className="cardBody">
                    <div className="topLine">
                      <span className="badge">
                        {concert.minimumPrice !== null
                          ? `From $${Math.round(concert.minimumPrice)}`
                          : 'Tickets available'}
                      </span>
                      <span className="vendor">Ticketmaster</span>
                    </div>

                    <h3>{concert.artist}</h3>

                    <p className="meta">
                      <CalendarDays size={17} />
                      {concert.date} • {concert.time}
                    </p>

                    <p className="meta">
                      <MapPin size={17} />
                      {concert.venue}, {concert.city}
                      {concert.state ? `, ${concert.state}` : ''}
                    </p>

                    <a
                      className="mapButton"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${concert.venue}, ${concert.city}, ${concert.state || ''}`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin size={16} />
                      <span>View on map</span>
</a>

<PriceComparisonCard
  providers={[
    {
      name: 'Ticketmaster',
      price: concert.providers?.ticketmaster?.price ?? null,
      url:
        concert.providers?.ticketmaster?.url ||
        concert.ticketUrl,
    },
    {
      name: 'SeatGeek',
      price: concert.providers?.seatgeek?.price ?? null,
      url:
        concert.providers?.seatgeek?.url ||
        `https://seatgeek.com/search?search=${encodeURIComponent(
          `${concert.artist} ${concert.city}`,
        )}`,
    },
    {
      name: 'StubHub',
      price: concert.providers?.stubhub?.price ?? null,
      url:
        concert.providers?.stubhub?.url ||
        `https://www.stubhub.com/secure/Search?q=${encodeURIComponent(
          `${concert.artist} ${concert.city}`,
        )}`,
    },
  ]}
/>
<div className="ticketOptions">
  <a
    href={concert.ticketUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="ticketButton"
  >
                        <span>Ticketmaster</span>
                        <strong>
                          {concert.minimumPrice !== null
                            ? `From $${Math.round(concert.minimumPrice)}`
                            : 'See prices'}
                        </strong>
                        <ExternalLink size={15} />
                      </a>

                      <a
                        href={`https://seatgeek.com/search?search=${encodeURIComponent(
                          `${concert.artist} ${concert.city}`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ticketButton secondaryTicketButton"
                      >
                        <span>SeatGeek</span>
                        <strong>Check tickets</strong>
                        <ExternalLink size={15} />
                      </a>

                      <a
                        href={`https://www.stubhub.com/secure/Search?q=${encodeURIComponent(
                          `${concert.artist} ${concert.city}`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ticketButton secondaryTicketButton"
                      >
                        <span>StubHub</span>
                        <strong>Check tickets</strong>
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </div>
                </article>
              )
            })}
          </section>
        )}

        {!loading && !error && displayedConcerts.length === 0 && (
          <div className="empty">
            {showFavoritesOnly
              ? 'You have not saved any concerts yet. Tap the heart on a concert card to add it to your favorites.'
              : `No upcoming concerts were found for ${searchedCity}. Try a nearby larger city or choose “All” genres.`}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}