export default function Categories() {
  const categories = [
    { icon: "🎸", label: "Rock" },
    { icon: "🤠", label: "Country" },
    { icon: "🎤", label: "Pop" },
    { icon: "🎧", label: "EDM" },
    { icon: "🤘", label: "Metal" },
    { icon: "🎭", label: "Broadway" },
    { icon: "😂", label: "Comedy" },
    { icon: "🎪", label: "Festivals" },
  ]

  return (
    <section className="categories">
      <h2>Browse by Category</h2>

      <div className="categoryGrid">
        {categories.map((category) => (
          <button
            key={category.label}
            className="categoryCard"
            type="button"
          >
            <span className="categoryIcon">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}