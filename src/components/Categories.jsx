import {
  CalendarDays,
  Guitar,
  Headphones,
  Mic2,
  Music2,
  Sparkles,
  Theater,
  Zap,
} from 'lucide-react'

const categories = [
  {
    label: 'Rock',
    subtitle: 'Arena tours and live bands',
    icon: Guitar,
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Country',
    subtitle: 'Country stars and festivals',
    icon: Music2,
    image:
      'https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Pop',
    subtitle: 'Chart-topping live shows',
    icon: Mic2,
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Electronic',
    subtitle: 'DJs, clubs and festivals',
    icon: Headphones,
    image:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Metal',
    subtitle: 'Heavy riffs and live energy',
    icon: Zap,
    image:
      'https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Broadway',
    subtitle: 'Musicals and stage productions',
    icon: Theater,
    image:
      'https://images.unsplash.com/photo-1507924538820-ede94a04019d?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Comedy',
    subtitle: 'Stand-up and live comedy',
    icon: Sparkles,
    image:
      'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Festivals',
    subtitle: 'Multi-day live experiences',
    icon: CalendarDays,
    image:
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80',
  },
]

export default function Categories({
  onSelectCategory,
  selectedCategory,
}) {
  return (
    <section className="categoriesSection">
      <div className="categoriesHeading">
        <div>
          <p className="sectionLabel">Explore live events</p>
          <h2>Browse by category</h2>
        </div>

        <p className="categoriesIntro">
          Find the kind of live experience you are looking for.
        </p>
      </div>

      <div className="categoryGrid">
        {categories.map((category) => {
          const Icon = category.icon
          const active = selectedCategory === category.label

          return (
            <button
              key={category.label}
              type="button"
              className={`categoryCard ${active ? 'active' : ''}`}
              style={{
                backgroundImage: `
                  linear-gradient(
                    90deg,
                    rgba(7, 9, 20, 0.95),
                    rgba(7, 9, 20, 0.58)
                  ),
                  url("${category.image}")
                `,
              }}
              onClick={() => onSelectCategory(category.label)}
            >
              <span className="categoryIconWrap">
                <Icon size={26} strokeWidth={1.8} />
              </span>

              <span className="categoryContent">
                <strong>{category.label}</strong>
                <small>{category.subtitle}</small>
              </span>

              <span className="categoryArrow">→</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}