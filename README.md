# Nodeflare Frontend (Hyperrcompute website)

Marketing website for a peer-to-peer GPU rental marketplace. The UI is branded **Hyperrcompute** ("World's first P2P GPU Market") and presents the product, pricing, serverless offering, hosting sign-up, and sign-in/sign-up screens, with animated scrolling effects.

> **Status:** front-end only. Sign-in and sign-up forms validate input on the client but are not connected to a backend (they log to the console / show an alert). Docs and Blog pages are placeholders, and some "How it works" copy is still lorem ipsum.

## Pages

| Route | Page | Content |
| --- | --- | --- |
| `/` | Home | Hero (on-demand / interruptible pricing), "Why choose us" (decentralised, peer-to-peer, self-custodial, lowest prices), Lightning/Satoshi payment section, Docker ecosystem, animated "Get started" section, "How it works" steps |
| `/hyperrcompute/pricing` | Pricing | GPU pricing listing and plan highlights |
| `/hyperrcompute/serverless` | Serverless | Serverless offering and listing |
| `/hyperrcompute/hosting` | Hosting | "Become a host" application page |
| `/hyperrcompute/docs` | Docs | Placeholder |
| `/hyperrcompute/blogs` | Blog | Placeholder |
| `/signin` | Sign in | Login form with client-side validation |
| `/signup` | Sign up | Registration form with client-side validation and terms checkbox |

Global components: `Navbar`, `Footer` and a custom `MouseFollower` cursor.

## Tech stack

- [Vite](https://vitejs.dev/) 5 + React 18 (JavaScript/JSX)
- React Router 6
- [Tailwind CSS](https://tailwindcss.com/) 3
- [GSAP](https://gsap.com/) (with ScrollTrigger) and [Locomotive Scroll](https://scroll.locomotive.ca/) for animations
- Custom fonts served from `public/`
- `gh-pages` for deployment

## Getting started

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Vite serves the app on its default port (5173).

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on `.js`/`.jsx` files (fails on any warning) |
| `npm run deploy` | Build (via `predeploy`) and publish `dist/` to the `gh-pages` branch |

No test script is configured.

## Configuration

No environment variables are used. `vite.config.js` sets `base: "./"` so the build works when served from a sub-path (e.g. GitHub Pages).

## Related

- Backend: [`nodeflare-be`](https://github.com/utkarshpayal/nodeflare-be) (authentication API). The frontend does not call it yet.
