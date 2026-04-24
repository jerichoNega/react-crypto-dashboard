# React Crypto Dashboard

[![Live Demo](https://img.shields.io/badge/Live-Demo-00e5d4?style=flat-square)](https://jerichonega.github.io/react-crypto-dashboard/)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

Real-time cryptocurrency tracking dashboard built with React and the CoinGecko public API. Live price feeds, interactive charts, and detailed coin analytics — no API key required.

## Features

- Live price data for 100+ cryptocurrencies via CoinGecko API
- Searchable coin list with price, 24h change, and market cap
- Detailed coin view with interactive Recharts price history
- Context API for global state — no prop drilling
- Responsive layout for desktop and mobile

## Tech Stack

| Layer | Tech |
|---|---|
| UI | React 18 + JSX |
| Build | Vite |
| Charts | Recharts |
| Data | CoinGecko REST API |
| Routing | React Router v6 |
| State | React Context API |

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/             # Global state (CoinContext)
├── pages/
│   ├── Home.jsx         # Coin list + search
│   └── CoinDetails.jsx  # Individual coin with chart
├── services/            # API call functions
├── App.jsx
└── main.jsx
```

## Run Locally

```bash
git clone https://github.com/jerichoNega/react-crypto-dashboard.git
cd react-crypto-dashboard
npm install
npm run dev
```

Visit `http://localhost:5173`

## Architecture

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for a full breakdown of state management, data flow, and component responsibilities.

## What's Next

- [ ] Portfolio tracker — add coins and track total value
- [ ] Price alerts via browser notifications
- [ ] Dark/light theme toggle
- [ ] Persistent favourites with localStorage
