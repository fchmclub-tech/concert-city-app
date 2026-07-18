import { useEffect, useState } from 'react'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Ticket,
} from 'lucide-react'

const ROTATION_TIME = 6000
const MAX_FEATURED_CONCERTS = 5

export default function FeaturedConcert({ concerts = [] }) {
  const featuredConcerts = concerts.slice(0, MAX_FEATURED_CONCERTS)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setCurrentIndex(0)
  }, [concerts])

  useEffect(() => {
    if (featuredConcerts.length <= 1 || isPaused) {
      return undefined
    }

    const timer = setInterval(() => {
      setCurrentIndex(
        (previousIndex) =>
          (previousIndex + 1) % featuredConcerts.length,
      )
    }, ROTATION_TIME)

    return () => clearInterval(timer)
  }, [featuredConcerts.length, isPaused])

  if (featuredConcerts.length === 0) {
    return null
  }

  const featuredConcert =
    featuredConcerts[currentIndex] || featuredConcerts[0]

  const showPreviousConcert = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0
        ? featuredConcerts.length - 1
        : previousIndex - 1,
    )
  }

  const showNextConcert = () => {
    setCurrentIndex(
      (previousIndex) =>
        (previousIndex + 1) % featuredConcerts.length,
    )
  }

  return (
    <section
      className="featuredConcert"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={
        featuredConcert.image
          ? {
              backgroundImage: `
                linear-gradient(
                  90deg,
                  rgba(5, 6, 16, 0.98) 0%,
                  rgba(5, 6, 16, 0.84) 42%,
                  rgba(5, 6, 16, 0.25) 100%
                ),
                url("${featuredConcert.image}")
              `,
            }
          : undefined
      }
    >
      <div
        className="featuredConcertContent"
        key={featuredConcert.id}
      >
        <span className="featuredEyebrow">
          <Sparkles size={16} />
          Featured event
        </span>

        <p className="featuredGenre">
          {featuredConcert.genre || 'Live event'}
        </p>

        <h1>{featuredConcert.artist}</h1>

        <div className="featuredMeta">
          <span>
            <CalendarDays size={18} />
            {featuredConcert.date} · {featuredConcert.time}
          </span>

          <span>
            <MapPin size={18} />
            {featuredConcert.venue}
          </span>
        </div>

        <p className="featuredDescription">
          Find tickets and compare available options for one of the
          biggest upcoming events near{' '}
          {featuredConcert.city || 'you'}.
        </p>

        <div className="featuredActions">
          <a
            href={featuredConcert.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="featuredPrimaryButton"
          >
            <Ticket size={18} />
            Find tickets
          </a>

          <button
            type="button"
            className="featuredSecondaryButton"
            onClick={() => {
              document
                .getElementById('results')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View all events
          </button>
        </div>
      </div>

      {featuredConcerts.length > 1 && (
        <>
          <div className="featuredNavigation">
            <button
              type="button"
              className="featuredArrowButton"
              onClick={showPreviousConcert}
              aria-label="Show previous featured concert"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              className="featuredArrowButton"
              onClick={showNextConcert}
              aria-label="Show next featured concert"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="featuredIndicators">
            {featuredConcerts.map((concert, index) => (
              <button
                key={concert.id}
                type="button"
                className={`featuredIndicator ${
                  index === currentIndex ? 'active' : ''
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Show featured concert ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}