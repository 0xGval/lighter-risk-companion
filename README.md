# Lighter Risk Companion

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)

A professional risk management calculator for [Lighter](https://lighter.xyz) traders. Calculate position sizes, risk/reward ratios, and manage your trades with precision.

[Demo](#) · [Report Bug](https://github.com/0xGval/lighter-risk-companion/issues) · [Request Feature](https://github.com/0xGval/lighter-risk-companion/issues)

</div>

---

## Features

- **Real-time Balance Integration** - Automatically syncs with your Lighter account balance via zkLighter API
- **Smart Risk Management** - Calculate position sizes based on account risk percentage
- **Risk/Reward Analysis** - Color-coded R/R ratios (Red < 1, Orange < 2, Green ≥ 2)
- **Live Calculations** - Instant updates as you adjust trade parameters
- **Modern UI** - Clean design with dark mode support
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Configurable** - Save your wallet address locally for convenience
- **Multiple Symbols** - Quick selection for BTC, ETH, HYPE, SOL, BNB

## Screenshots

<img width="1473" height="978" alt="image" src="https://github.com/user-attachments/assets/7d5ed2d1-4f61-4400-9d16-657f45458dda" />


## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A Lighter account (for balance integration)

### Installation

1. Clone the repository
```bash
git clone https://github.com/0xGval/lighter-risk-companion.git
cd lighter-risk-companion
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## How to Use

### Initial Setup

1. Click the Settings icon in the header
2. Enter your Lighter wallet address (L1 address)
3. Click Save - your address is stored locally in your browser

### Trading Workflow

1. **Select Symbol** - Choose from BTC, ETH, HYPE, SOL, or BNB
2. **Set Risk** - Use the slider to select 0.25%, 0.5%, or 1% risk per trade
3. **Enter Trade Parameters:**
   - Entry Price
   - Stop Loss Price
   - Take Profit Price
   - Leverage
4. **Review Calculations:**
   - Risk per Unit
   - Reward per Unit
   - Risk/Reward Ratio (color-coded)
   - Position Size
   - Position Value
   - Margin Used
   - % of Account Used
   - Net P/L at Target

### Understanding the Display

- **Green R/R** - Excellent trade (≥ 2:1 ratio)
- **Orange R/R** - Moderate trade (1-2:1 ratio)
- **Red R/R** - Poor trade (< 1:1 ratio)

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Pure CSS** - Lightweight styling with dark mode
- **zkLighter API** - Real-time balance fetching

## API Integration

This app integrates with the zkLighter API to fetch real-time account balances:

```
https://mainnet.zklighter.elliot.ai/api/v1/accountsByL1Address?l1_address={YOUR_ADDRESS}
```

Balance updates automatically every 30 seconds.

## Customization

### Adding New Symbols

1. Add your icon to `public/icons/` (e.g., `doge.svg`)
2. Update the symbol array in `src/App.jsx`:
```javascript
{['BTC', 'ETH', 'HYPE', 'SOL', 'BNB', 'DOGE'].map((sym) => ...
```

### Changing the Logo

Replace `public/icons/logo.svg` with your own logo (24x24px recommended).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built for the [Lighter](https://lighter.xyz) trading community
- Inspired by professional risk management tools
- Icons from various crypto projects

## Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">
Built for Lighter Traders
</div>

