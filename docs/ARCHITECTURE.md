# Architecture — React Crypto Dashboard

## Overview

The app is a client-side React SPA with two routes. It talks to the CoinGecko public API — no backend, no API key needed.

```
Browser → React Router → Home or CoinDetails → CoinContext → CoinGecko API
```

## State Management

A single `CoinContext` (React Context + useReducer) holds:
- `coins` — full list fetched once on app mount
- `loading` — global loading flag
- `currency` — selected currency (default: USD)

This avoids prop drilling and redundant API calls. Any component can read coin data via `useContext(CoinContext)`.

## Data Flow

```
App mount
  └─ CoinContext fetches /coins/markets
        └─ Home renders CoinList
              └─ User clicks coin
                    └─ Navigate to /coins/:id
                          └─ CoinDetails fetches /coins/:id/market_chart
                                └─ Recharts renders price history
```

## Component Responsibilities

| Component | Responsibility |
|---|---|
| `CoinContext` | Fetch + store global coin list |
| `Home` | Search, filter, render coin cards |
| `CoinDetails` | Fetch chart data, render coin detail |
| `LineChart` (Recharts) | Visualize price history |

## Why Recharts?

Recharts is React-native (renders SVG via React components) which means it integrates naturally with state and re-renders correctly. Alternatives like Chart.js require manual DOM management in useEffect.

## API Endpoints Used

```
GET https://api.coingecko.com/api/v3/coins/markets
  ?vs_currency=usd&order=market_cap_desc&per_page=100

GET https://api.coingecko.com/api/v3/coins/{id}/market_chart
  ?vs_currency=usd&days=30
```
