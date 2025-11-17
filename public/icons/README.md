# Crypto Icons

This folder contains the cryptocurrency ticker icons used in the symbol selector.

## Current Icons
- `btc.svg` - Bitcoin (Orange)
- `eth.svg` - Ethereum (Blue)
- `sol.svg` - Solana (Green)
- `bnb.svg` - Binance Coin (Yellow)
- `hype.svg` - Hype (Purple)

## How to Add or Replace Icons

### Method 1: Replace existing SVG files
Simply replace any of the `.svg` files with your own icon. Keep the same filename.

### Method 2: Use PNG/JPG images
You can use PNG or JPG images instead of SVG:
1. Name your file: `btc.png`, `eth.png`, etc.
2. Update `src/App.jsx` line 144 to use `.png` or `.jpg` instead of `.svg`

### Method 3: Add new symbols
1. Add your icon file here (e.g., `doge.svg`)
2. Update the symbol array in `src/App.jsx` line 138:
   ```javascript
   {['BTC', 'ETH', 'HYPE', 'SOL', 'BNB', 'DOGE'].map((sym) => ...
   ```

## Recommended Icon Specs
- Format: SVG (preferred), PNG, or JPG
- Size: 24x24px or larger (will be scaled to 20x20px)
- Style: Simple, recognizable brand logos
- Background: Transparent or circular background

## Getting Icons
- **CoinGecko**: https://www.coingecko.com/ (right-click coin logo)
- **CryptoCompare**: https://www.cryptocompare.com/
- **Free SVG icons**: Search "[coin name] logo svg"
- **Crypto Icons Pack**: https://cryptoicons.co/

Just download and place them in this folder!

