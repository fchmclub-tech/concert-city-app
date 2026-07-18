import { useState } from "react";
import { Search as SearchIcon, MapPin } from "lucide-react";

export default function Search() {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    console.log("Searching for:", query);
  }

  return (
    <main className="searchPage">
      <section className="searchHero">
        <p className="eyebrow">Find your next live experience</p>

        <h1>Search concerts, sports, theater, comedy, and more.</h1>

        <p className="searchIntro">
          Search by artist, team, venue, city, or event.
        </p>

        <form className="eventSearchForm" onSubmit={handleSubmit}>
          <div className="searchInputWrap">
            <SearchIcon size={21} />

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search artist, venue, city, or event"
            />
          </div>

          <button type="submit" className="primarySearchButton">
            Search Events
          </button>
        </form>

        <div className="quickSearches">
          <button type="button">
            <MapPin size={17} />
            Near Me
          </button>

          <button type="button">This Weekend</button>
          <button type="button">Concerts</button>
          <button type="button">Sports</button>
          <button type="button">Theater</button>
          <button type="button">Comedy</button>
        </div>
      </section>

      <section id="results" className="searchResultsSection">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow">Live events</p>
            <h2>Search results will appear here</h2>
          </div>
        </div>

        <div className="emptySearchState">
          <SearchIcon size={34} />
          <h3>Start searching for an event</h3>
          <p>
            Try a city like Salt Lake City, an artist, a team, or a venue.
          </p>
        </div>
      </section>
    </main>
  );
}