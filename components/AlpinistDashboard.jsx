'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function AlpinistDashboard() {
  const chartContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Backend v2.1 State Data Model
  const [data] = useState({
    goldPrice: 2485.50,
    priceSource: 'Binance PAXG Spot',
    recommendation: 'STRONG BUY',
    finalConfidence: 78,
    bias: 'BULLISH 🐂',
    marketTrend: 'UPTREND',
    riskLevel: 'LOW RISK ✅',
    volatilityStatus: 'MEDIUM',
    entryPrice: 2480.00,
    stopLoss: 2430.40,
    takeProfit: 2579.20,
    buyCount: 9,
    sellCount: 2,
    neutralCount: 4,
    rsi: '64.20',
    macd: 'BUY',
    forecast15m: 'Bullish momentum; expecting support at $2475.00',
    forecast1h: 'Uptrend likely; resistance at $2490.00',
    forecast24h: 'Strong Daily Bullish Trend; macro buyers maintaining control towards $2515.00',
    asianStatus: { tokyo: true, hk: true, pk: true },
    macro: {
      score: 72,
      realYields: -0.35,
      realYieldsTrend: '🟢 BULLISH',
      dxyMomentum: -2.3,
      dxyTrend: '🟢 USD WEAKENING',
      fedPivot: 'Dovish Bias',
      high24h: 2522.78,
      low24h: 2448.22,
      interpretation: 'Strong structural tailwinds for gold'
    },
    positioning: {
      score: 64,
      cotLongPercent: 78,
      gldDailyFlow: 45, // Millions
      leaseRate: 2.15,
      retailLong: 82,
      expectedTarget: 2535.21,
      interpretation: 'Institutional accumulation vs. Crowded fund long'
    },
    micro: {
      score: 71,
      cumulativeDelta: 2450,
      ivRegime: 'Institutional Calm',
      vwapPrice: 2422.10,
      buyRatio: 68,
      sellRatio: 32,
      resistance: 2560.07,
      support: 2410.93,
      interpretation: 'Order flow confirms institutional demand'
    }
  });

  const alpinistScore = Math.round((data.macro.score + data.positioning.score + data.micro.score) / 3);
  const alpinistSignal = alpinistScore > 70 ? '🟢 STRONG BUY' : alpinistScore > 60 ? '🟢 BUY' : '🔴 SELL';

  // Interactive Chart Render Engine
  useEffect(() => {
    if (typeof window === 'undefined' || !chartContainerRef.current) return;

    let chart;
    import('lightweight-charts').then(({ createChart }) => {
      if (!chartContainerRef.current) return;

      chartContainerRef.current.innerHTML = '';
      chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 380,
        layout: { backgroundColor: '#0b0f19', textColor: '#9ca3af' },
        grid: { vertLines: { color: '#1f2937' }, horzLines: { color: '#1f2937' } },
        timeScale: { timeVisible: true, borderColor: '#374151' },
        rightPriceScale: { borderColor: '#374151' }
      });

      const candleSeries = chart.addCandlestickSeries({
        upColor: '#10b981', downColor: '#ef4444', borderVisible: false, wickUpColor: '#10b981', wickDownColor: '#ef4444'
      });

      const now = Math.floor(Date.now() / 1000);
      const mockCandles = Array.from({ length: 40 }, (_, i) => {
        const time = now - (40 - i) * 300;
        const base = 2470 + Math.sin(i / 3) * 10 + i * 0.4;
        return { time, open: base - 1, high: base + 3, low: base - 2, close: base + 1.5 };
      });

      candleSeries.setData(mockCandles);
      candleSeries.createPriceLine({ price: data.entryPrice, color: '#3b82f6', title: 'ENTRY' });
      candleSeries.createPriceLine({ price: data.stopLoss, color: '#ef4444', title: 'SL' });
      candleSeries.createPriceLine({ price: data.takeProfit, color: '#10b981', title: 'TP' });
      candleSeries.createPriceLine({ price: data.micro.resistance, color: '#eab308', title: 'ALPINIST RES' });

      const handleResize = () => chart && chartContainerRef.current && chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      window.addEventListener('resize', handleResize);
    });

    return () => chart && chart.remove();
  }, [data, activeTab]);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0b0f19', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1f2937', marginBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', color: '#eab308', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚜️ ALPINIST v2.1 <span style={{ fontSize: '12px', background: '#1e293b', color: '#94a3b8', padding: '2px 8px', borderRadius: '4px' }}>Dual-Engine Terminal</span>
          </h1>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>Source: {data.priceSource} · Live Sync</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>SPOT XAU/USD</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#f3f4f6' }}>${data.goldPrice.toFixed(2)}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>24H RANGE</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', marginTop: '4px' }}>
              <span style={{ color: '#10b981' }}>${data.macro.high24h}</span> / <span style={{ color: '#ef4444' }}>${data.macro.low24h}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ASIAN MARKET STATUS BAR */}
      <div style={{ background: '#111827', padding: '10px 16px', borderRadius: '8px', border: '1px solid #1f2937', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
        <div>
          <strong>🌏 ASIAN MARKET STATUS:</strong> Tokyo {data.asianStatus.tokyo ? '🟢 OPEN' : '🔴 CLOSED'} | HK {data.asianStatus.hk ? '🟢 OPEN' : '🔴 CLOSED'} | Pakistan {data.asianStatus.pk ? '🟢 OPEN' : '🔴 CLOSED'}
        </div>
        <div style={{ color: '#9ca3af' }}>💡 Moderate volatility expected in Asian Session</div>
      </div>

      {/* DUAL-SYSTEM SIGNAL OVERVIEW CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        
        {/* ENGINE 1 CARD */}
        <div style={{ background: '#0b0f19', padding: '16px', borderRadius: '10px', border: '1px solid #1f2937' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '12px' }}>
            <span>ENGINE 1: REACTIVE MARKET BOT</span>
            <span>Confidence: {data.finalConfidence}%</span>
          </div>
          <h2 style={{ color: '#3b82f6', margin: '8px 0', fontSize: '24px' }}>{data.recommendation}</h2>
          <div style={{ fontSize: '12px', display: 'flex', gap: '12px', color: '#d1d5db' }}>
            <span>Bias: <strong>{data.bias}</strong></span>
            <span>Risk: <strong>{data.riskLevel}</strong></span>
            <span>Signals: <span style={{ color: '#10b981' }}>{data.buyCount}B</span> / <span style={{ color: '#ef4444' }}>{data.sellCount}S</span> / <span style={{ color: '#9ca3af' }}>{data.neutralCount}N</span></span>
          </div>
        </div>

        {/* ENGINE 2 CARD */}
        <div style={{ background: '#0b0f19', padding: '16px', borderRadius: '10px', border: '1px solid #eab308' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '12px' }}>
            <span>ENGINE 2: ALPINIST PROACTIVE SYSTEM</span>
            <span>Score: {alpinistScore}/100</span>
          </div>
          <h2 style={{ color: '#eab308', margin: '8px 0', fontSize: '24px' }}>{alpinistSignal}</h2>
          <div style={{ fontSize: '12px', display: 'flex', gap: '12px', color: '#d1d5db' }}>
            <span>Macro: <strong>{data.macro.score}/100</strong></span>
            <span>Positioning: <strong>{data.positioning.score}/100</strong></span>
            <span>Micro: <strong>{data.micro.score}/100</strong></span>
          </div>
        </div>

      </div>

      {/* NAVIGATION TABS */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #1f2937', marginBottom: '16px' }}>
        {[
          { id: 'overview', label: '📊 Dual Execution Desk & Chart' },
          { id: 'alpinist', label: '⚜️ Alpinist 3-Layer Deep Analysis' },
          { id: 'forecasts', label: '🔮 Technical & Macro Forecasts' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 16px',
              background: activeTab === tab.id ? '#1e293b' : 'transparent',
              color: activeTab === tab.id ? '#eab308' : '#9ca3af',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #eab308' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: CHART & EXECUTION COMPARISON */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
          
          <div style={{ background: '#0b0f19', padding: '16px', borderRadius: '10px', border: '1px solid #1f2937' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px', color: '#9ca3af' }}>Dynamic Level Execution Chart</div>
            <div ref={chartContainerRef} style={{ width: '100%', height: '380px' }} />
          </div>

          <div style={{ background: '#0b0f19', padding: '16px', borderRadius: '10px', border: '1px solid #1f2937', fontSize: '13px' }}>
            <h3 style={{ marginTop: 0, color: '#f3f4f6', fontSize: '14px', borderBottom: '1px solid #1f2937', pb: '8px' }}>Trade Execution Matrix</h3>
            
            <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#111827', borderRadius: '6px' }}>
                <span style={{ color: '#9ca3af' }}>Entry Target</span>
                <strong style={{ color: '#3b82f6' }}>${data.entryPrice.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#111827', borderRadius: '6px' }}>
                <span style={{ color: '#9ca3af' }}>Stop Loss (SL)</span>
                <strong style={{ color: '#ef4444' }}>${data.stopLoss.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#111827', borderRadius: '6px' }}>
                <span style={{ color: '#9ca3af' }}>Take Profit (TP)</span>
                <strong style={{ color: '#10b981' }}>${data.takeProfit.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#111827', borderRadius: '6px' }}>
                <span style={{ color: '#9ca3af' }}>Alpinist Res / TP2</span>
                <strong style={{ color: '#eab308' }}>${data.micro.resistance}</strong>
              </div>
            </div>

            <div style={{ marginTop: '16px', padding: '12px', background: '#1e1b4b', borderRadius: '6px', borderLeft: '3px solid #6366f1' }}>
              <strong style={{ color: '#a5b4fc', display: 'block', marginBottom: '4px' }}>DUAL-SYSTEM ALIGNMENT</strong>
              <span style={{ color: '#c7d2fe', fontSize: '11px' }}>✅ FULL ALIGNMENT - Reactive Bot & Alpinist System agree on Bullish Continuation.</span>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ALPINIST 3-LAYER SYSTEM */}
      {activeTab === 'alpinist' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          
          {/* LAYER 1 */}
          <div style={{ background: '#0b0f19', padding: '16px', borderRadius: '10px', border: '1px solid #1f2937' }}>
            <h3 style={{ color: '#3b82f6', marginTop: 0, fontSize: '15px' }}>LAYER 1: MACRO EXPECTATION ({data.macro.score}/100)</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.2', fontSize: '13px', color: '#d1d5db' }}>
              <li>Real Yields: <strong>{data.macro.realYields}%</strong> ({data.macro.realYieldsTrend})</li>
              <li>DXY Momentum: <strong>{data.macro.dxyMomentum}%</strong> ({data.macro.dxyTrend})</li>
              <li>Fed Signal: <strong>{data.macro.fedPivot}</strong></li>
              <li>Conclusion: <em style={{ color: '#9ca3af' }}>{data.macro.interpretation}</em></li>
            </ul>
          </div>

          {/* LAYER 2 */}
          <div style={{ background: '#0b0f19', padding: '16px', borderRadius: '10px', border: '1px solid #1f2937' }}>
            <h3 style={{ color: '#eab308', marginTop: 0, fontSize: '15px' }}>LAYER 2: POSITIONING & SENTIMENT ({data.positioning.score}/100)</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.2', fontSize: '13px', color: '#d1d5db' }}>
              <li>COT Non-Comm: <strong>{data.positioning.cotLongPercent}th %ile Long</strong></li>
              <li>GLD Flows: <strong>+${data.positioning.gldDailyFlow}M ACCUMULATION</strong></li>
              <li>Retail Long: <strong>{data.positioning.retailLong}%</strong></li>
              <li>Expected Target: <strong>${data.positioning.expectedTarget}</strong></li>
            </ul>
          </div>

          {/* LAYER 3 */}
          <div style={{ background: '#0b0f19', padding: '16px', borderRadius: '10px', border: '1px solid #1f2937' }}>
            <h3 style={{ color: '#10b981', marginTop: 0, fontSize: '15px' }}>LAYER 3: MICROSTRUCTURE ({data.micro.score}/100)</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2.2', fontSize: '13px', color: '#d1d5db' }}>
              <li>Cumulative Delta: <strong>+{data.micro.cumulativeDelta}</strong></li>
              <li>IV Regime: <strong>{data.micro.ivRegime}</strong></li>
              <li>Order Book Pressure: <strong>{data.micro.buyRatio}% Buy / {data.micro.sellRatio}% Sell</strong></li>
              <li>VWAP Level: <strong>${data.micro.vwapPrice}</strong></li>
            </ul>
          </div>

        </div>
      )}

      {/* TAB 3: FORECASTS */}
      {activeTab === 'forecasts' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: '#0b0f19', padding: '16px', borderRadius: '10px', border: '1px solid #1f2937' }}>
            <h3 style={{ color: '#f59e0b', marginTop: 0 }}>Multi-Timeframe Forecast Engine</h3>
            <div style={{ display: 'grid', gap: '12px', fontSize: '13px' }}>
              <div style={{ padding: '10px', background: '#111827', borderRadius: '6px' }}>
                <strong>15-Minute Horizon:</strong> {data.forecast15m}
              </div>
              <div style={{ padding: '10px', background: '#111827', borderRadius: '6px' }}>
                <strong>1-Hour Horizon:</strong> {data.forecast1h}
              </div>
              <div style={{ padding: '10px', background: '#111827', borderRadius: '6px' }}>
                <strong>24-Hour Macro Horizon:</strong> {data.forecast24h}
              </div>
            </div>
          </div>

          <div style={{ background: '#0b0f19', padding: '16px', borderRadius: '10px', border: '1px solid #1f2937' }}>
            <h3 style={{ color: '#3b82f6', marginTop: 0 }}>Engine Indicator Check</h3>
            <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#111827', borderRadius: '4px' }}>
                <span>RSI (14) Indicator:</span> <strong>{data.rsi}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#111827', borderRadius: '4px' }}>
                <span>MACD Signal:</span> <strong>{data.macd}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#111827', borderRadius: '4px' }}>
                <span>Market Trend Regime:</span> <strong>{data.marketTrend}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
