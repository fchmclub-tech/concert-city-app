import { Ticket } from "lucide-react";

export default function Header({
  currentPage,
  onShowHome,
  onShowTickets,
  onShowFavorites,
}) {
  return (
    <nav className="nav">
      <div className="brand">
        <span className="brandIcon">
          <Ticket size={22} />
        </span>

        <div>
          <h2 className="brandTitle">Front Center Tix</h2>
          <p className="brandTagline">One Pass. All The Live.</p>
        </div>
      </div>

      <div className="navLinks">
        <button
          type="button"
          className={`navLink ${currentPage === "home" ? "active" : ""}`}
          onClick={onShowHome}
        >
          Home
        </button>

        <button
          type="button"
          className={`navLink ${currentPage === "tickets" ? "active" : ""}`}
          onClick={onShowTickets}
        >
          Find Tickets
        </button>

        <button
          type="button"
          className={`navLink ${currentPage === "favorites" ? "active" : ""}`}
          onClick={onShowFavorites}
        >
          Favorites
        </button>

        <button
          type="button"
          className="navLink"
        >
          Alerts
        </button>

        <button
          type="button"
          className="navLink"
        >
          Account
        </button>
      </div>
    </nav>
  );
}
