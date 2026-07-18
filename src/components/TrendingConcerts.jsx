import { CalendarDays, MapPin, TrendingUp } from 'lucide-react'

export default function TrendingConcerts({ concerts = [] }) {
  const trendingConcerts = concerts.slice(0, 4)

  if (trendingConcerts.length === 0) {
    return null
  }

  return (
    <section className="trendingSection">
      <div className="trendingHeading">
        <div>
          <p className="sectionLabel">
            <TrendingUp size={16} />
            Popular near you
          </p>

          <h2>Trending concerts</h2>
        </div>

        <p>
          Discover some of the biggest upcoming shows in your area.
        </p>
      </div>

      <div className="trendingGrid">
        {trendingConcerts.map((concert, index) => (
          <article className="trendingCard" key={concert.id}>
            <div
              className="trendingImage"
              style={
                concert.image
                  ? {
                      backgroundImage: `
                        linear-gradient(
                          to top,
                          rgba(7, 9, 20, 0.96),
                          rgba(7, 9, 20, 0.12)
                        ),
                        url("${concert.image}")
                      `,
                    }
                  : undefined
              }
            >
              <span className="trendingNumber">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="trendingBadge">
                <TrendingUp size={15} />
                Trending
              </span>

              <div className="trendingDetails">
                <span className="trendingGenre">{concert.genre}</span>

                <h3>{concert.artist}</h3>

                <p>
                  <CalendarDays size={16} />
                  {concert.date} · {concert.time}
                </p>

                <p>
                  <MapPin size={16} />
                  {concert.venue}
                </p>

                <a
                  href={concert.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View tickets
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}