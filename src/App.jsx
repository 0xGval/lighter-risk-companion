import { useState, useEffect } from 'react'

const DEFAULT_WALLET_ADDRESS = ''
const REFRESH_INTERVAL = 30000 // 30 seconds

function App() {
  const [walletAddress, setWalletAddress] = useState(() => {
    return localStorage.getItem('walletAddress') || DEFAULT_WALLET_ADDRESS
  })
  const [showSettings, setShowSettings] = useState(false)
  const [tempAddress, setTempAddress] = useState('')
  const [accountSize, setAccountSize] = useState(0)
  const [riskPercent, setRiskPercent] = useState(1)
  const [symbol, setSymbol] = useState('BTC')
  const [entryPrice, setEntryPrice] = useState(45)
  const [stopLoss, setStopLoss] = useState(43)
  const [takeProfit, setTakeProfit] = useState(48)
  const [leverage, setLeverage] = useState(5)
  const [indicatorColor, setIndicatorColor] = useState('#86868b')

  // Fetch account balance
  const fetchAccountBalance = async () => {
    setIndicatorColor('#0071e3') // Blue when fetching

    try {
      const response = await fetch(
        `https://mainnet.zklighter.elliot.ai/api/v1/accountsByL1Address?l1_address=${walletAddress}`,
        {
          headers: {
            accept: 'application/json',
          },
        }
      )

      const data = await response.json()

      if (data.code === 200 && data.sub_accounts && data.sub_accounts.length > 0) {
        const collateral = parseFloat(data.sub_accounts[0].collateral)
        if (!isNaN(collateral) && collateral > 0) {
          setAccountSize(collateral)
          setIndicatorColor('#34c759') // Green on success
        } else {
          setIndicatorColor('#ff3b30') // Red on error
        }
      } else {
        setIndicatorColor('#ff3b30') // Red on error
      }
    } catch (error) {
      console.error('Error fetching balance:', error)
      setIndicatorColor('#ff3b30') // Red on error
    }

    // Fade indicator back to gray
    setTimeout(() => {
      setIndicatorColor('#86868b')
    }, 2000)
  }

  // Save wallet address to localStorage and fetch balance
  const saveWalletAddress = () => {
    if (tempAddress.trim()) {
      localStorage.setItem('walletAddress', tempAddress.trim())
      setWalletAddress(tempAddress.trim())
      setShowSettings(false)
      fetchAccountBalance()
    }
  }

  const openSettings = () => {
    setTempAddress(walletAddress)
    setShowSettings(true)
  }

  // Fetch on mount and set interval
  useEffect(() => {
    fetchAccountBalance()
    const interval = setInterval(fetchAccountBalance, REFRESH_INTERVAL)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress])

  // Calculations
  const riskAmount = accountSize * (riskPercent / 100)
  const riskPerUnit = Math.abs(entryPrice - stopLoss)
  const rewardPerUnit = Math.abs(takeProfit - entryPrice)
  const rrRatio = riskPerUnit > 0 ? rewardPerUnit / riskPerUnit : 0
  const positionSize = riskPerUnit > 0 ? riskAmount / riskPerUnit : 0
  const positionValue = positionSize * entryPrice
  const marginUsed = positionValue / leverage
  const accountPercent = accountSize > 0 ? (marginUsed / accountSize) * 100 : 0
  const netPL = positionSize * rewardPerUnit

  const formatCurrency = (value) => {
    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <div className="container">
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/icons/logo.svg" alt="Logo" style={{ width: '24px', height: '24px' }} />
          <span>Risk Management Companion</span>
        </div>
        <button className="settings-btn" onClick={openSettings} title="Settings">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="white" strokeWidth="1.5"/>
            <path d="M16.5 10C16.5 10.3 16.475 10.6 16.425 10.9L18.5 12.5L16.5 16L14.075 15.1C13.575 15.5 13.025 15.825 12.425 16.05L12 18.5H8L7.575 16.05C6.975 15.825 6.425 15.5 5.925 15.1L3.5 16L1.5 12.5L3.575 10.9C3.525 10.6 3.5 10.3 3.5 10C3.5 9.7 3.525 9.4 3.575 9.1L1.5 7.5L3.5 4L5.925 4.9C6.425 4.5 6.975 4.175 7.575 3.95L8 1.5H12L12.425 3.95C13.025 4.175 13.575 4.5 14.075 4.9L16.5 4L18.5 7.5L16.425 9.1C16.475 9.4 16.5 9.7 16.5 10Z" stroke="white" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Settings</h2>
            <div className="field">
              <label>Wallet Address</label>
              <input
                type="text"
                value={tempAddress}
                onChange={(e) => setTempAddress(e.target.value)}
                placeholder="Enter wallet address"
                style={{ textAlign: 'left', fontFamily: 'monospace' }}
              />
            </div>
            <div className="modal-buttons">
              <button className="modal-btn cancel" onClick={() => setShowSettings(false)}>
                Cancel
              </button>
              <button className="modal-btn save" onClick={saveWalletAddress}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="content">
        {/* Left Panel: Inputs */}
        <div className="left-panel">
          <div className="section">
            <div className="field">
              <label>Wallet Address</label>
              <div className="wallet-display">
                <span className="wallet-address">{walletAddress}</span>
                <span className="refresh-indicator" style={{ color: indicatorColor }}>
                  ●
                </span>
              </div>
            </div>

            <div className="field">
              <label>Account Size ($)</label>
              <input
                type="number"
                className="account-size-input"
                value={accountSize.toFixed(2)}
                readOnly
              />
            </div>

            <div className="field">
              <label>Risk % per Trade</label>
              <div className="risk-slider-container">
                <input
                  type="range"
                  min="0.25"
                  max="1"
                  step="0.25"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, #0071e3 0%, #0071e3 ${((riskPercent - 0.25) / (1 - 0.25)) * 100}%, #e5e5ea ${((riskPercent - 0.25) / (1 - 0.25)) * 100}%, #e5e5ea 100%)`
                  }}
                />
                <span className="risk-display">{riskPercent}%</span>
              </div>
              <div className="slider-labels">
                <span className="slider-label">0.25%</span>
                <span className="slider-label">0.5%</span>
                <span className="slider-label">1%</span>
              </div>
            </div>

            <div className="field">
              <label>Risk Amount ($)</label>
              <input type="number" value={riskAmount.toFixed(2)} readOnly />
            </div>
          </div>

          <div className="section">
            <div className="field">
              <label>Symbol / Pair</label>
              <div className="symbol-selector">
                {['BTC', 'ETH', 'HYPE', 'SOL', 'BNB'].map((sym) => (
                  <button
                    key={sym}
                    className={`symbol-btn ${symbol === sym ? 'active' : ''}`}
                    onClick={() => setSymbol(sym)}
                  >
                    <img src={`/icons/${sym.toLowerCase()}.png`} alt={sym} className="symbol-icon" />
                    <span>{sym}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid-2">
              <div className="field">
                <label>Entry Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="field">
                <label>Stop Loss Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="field">
                <label>Take Profit Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="field">
                <label>Leverage (×)</label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={leverage}
                  onChange={(e) => setLeverage(parseFloat(e.target.value) || 1)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Results */}
        <div className="right-panel">
          <div className="result-row">
            <span className="result-label">Risk per Unit (Entry–Stop)</span>
            <span className="result-value">{riskPerUnit.toFixed(2)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Reward per Unit (TP–Entry)</span>
            <span className="result-value">{rewardPerUnit.toFixed(2)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Risk/Reward Ratio</span>
            <span 
              className="result-value" 
              style={{ 
                color: rrRatio < 1 ? '#ff3b30' : rrRatio < 2 ? '#ff9500' : '#34c759',
                fontWeight: 700
              }}
            >
              {rrRatio.toFixed(2)}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Position Size (Units)</span>
            <span className="result-value">{positionSize.toFixed(2)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Position Value ($)</span>
            <span className="result-value">{formatCurrency(positionValue)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Margin Used ($)</span>
            <span className="result-value">{formatCurrency(marginUsed)}</span>
          </div>
          <div className="result-row">
            <span className="result-label">% of Account Used (on margin)</span>
            <span className="result-value">{accountPercent.toFixed(2)}%</span>
          </div>
          <div className="result-row">
            <span className="result-label">Net P/L at Target ($)</span>
            <span className="result-value">{formatCurrency(netPL)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

