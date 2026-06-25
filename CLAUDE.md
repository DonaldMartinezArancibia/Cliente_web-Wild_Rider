# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install --legacy-peer-deps   # Install dependencies (legacy-peer-deps is required)
npm run develop                  # Dev server at http://localhost:8000
npm run build                    # Production build to /public
npm run serve                    # Serve production build at http://localhost:9000
npm run clean                    # Clear Gatsby cache and build output
npm run format                   # Format code with Prettier
```

Docker alternative:
```bash
docker-compose up --build        # Dev server at http://localhost:8000
```

## Environment Variables

Create a `.env` file in the root with:
```
GATSBY_GRAPHCMS_ENDPOINT=   # Hygraph GraphQL endpoint
GATSBY_GRAPHCMS_TOKEN=      # Hygraph API access token
```

## Architecture

**JAMstack / Gatsby SSG** — pages are statically generated at build time from content fetched via GraphQL from Hygraph (formerly GraphCMS).

### Page Generation (`gatsby-node.js`)
All routes are dynamically created from Hygraph content types. For each locale (`en`, `es`, `de`, `fr`, `other`), `gatsby-node.js` queries every content type and calls `createPage` pointing to the matching template in `src/templates/`. English routes have no prefix (`/`); other locales get `/{locale}/` prefix. The `langKey` and `slug` are passed as page context.

### Content Layer
- **Build-time**: `gatsby-source-graphcms` pulls all CMS data at build time via GraphQL fragments in `graphcms-fragments/`.
- **Runtime**: `@apollo/client` (via `gatsby-plugin-apollo`) handles dynamic queries — used in quote forms and contact forms (`src/components/carQuoteQuery.jsx`, `src/components/contactFormQuery.jsx`).

### Templates vs Components
- `src/templates/` — one file per CMS content type/page type; receives `pageContext` with `slug`, `remoteId`, `langKey`.
- `src/components/` — reusable UI pieces; `layout.jsx` wraps all pages; `header.jsx` / `footer.jsx` are site-wide.

### i18n
`gatsby-plugin-i18n` handles localized routing. English is the default (no URL prefix). Each template receives `langKey` in page context. The `src/components/languajeSelector.jsx` component handles the language switcher UI.

### Styling
Tailwind CSS v4 with PostCSS. Global styles in `src/styles/global.css`. Component-level CSS modules exist alongside some components (e.g. `index.module.css`).

### Key Content Types (Hygraph → Template mapping)
| Hygraph type | Template |
|---|---|
| `Index` | `src/templates/index.jsx` |
| `ContactAndLocation` | `src/templates/contactAndLocation.jsx` |
| `CarsAndQuote` | `src/templates/ourCarsAndReservation.jsx` |
| `CarQuoteForm` | `src/templates/CarForm.jsx` |
| `AboutUsAndOurTeam` | `src/templates/aboutUsAndOurTeam.jsx` |
| `Testimonial` | `src/templates/testimonials.jsx` |
| `Faq` | `src/templates/frequentAnswerAndQuestion.jsx` |
| `AirportAndOfficePage` | `src/templates/airportAndOffice.jsx` |
| `CampingPage` | `src/templates/campingPage.jsx` |
| `RoadSafety` | `src/templates/roadSafety.jsx` |
| `Insurance` | `src/templates/insurance.jsx` |
| `Imprint` | `src/templates/imprint.jsx` |
