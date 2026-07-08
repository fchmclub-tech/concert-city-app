# Concert City Finder

A clean responsive concert-search app for desktop and mobile. Users enter a city and the app shows concerts with venue details and the best visible ticket price across vendors.

## What it includes

- Mobile and desktop friendly UI
- City search
- Concert cards with artwork-style graphics
- Vendor price comparison
- Best-price badge
- Filter by genre
- Sample data so it runs immediately
- Ready structure for real APIs such as Ticketmaster, SeatGeek, StubHub affiliate/API access, Bandsintown, or venue feeds

## Run locally

1. Install Node.js from https://nodejs.org
2. Open a terminal in this folder
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL Vite shows, usually http://localhost:5173

## Build for deployment

```bash
npm run build
```

The production files will be in the `dist` folder.

## GitHub upload

Upload all files in this folder to a new GitHub repository. You can deploy free with Vercel, Netlify, or GitHub Pages.

## Important note about real vendor prices

This demo shows sample vendor prices. To show live prices from all vendors, you will need authorized APIs, affiliate feeds, or partner access from ticket vendors. Many resale sites restrict scraping, so use official APIs or affiliate feeds when possible.
