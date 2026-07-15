import { Ticket } from "lucide-react";

export default function Header() {
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

      <a href="#results" className="navLink">
        Find Tickets
      </a>
    </nav>
  );
}