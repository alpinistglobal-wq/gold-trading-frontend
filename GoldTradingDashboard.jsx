/**
 * GOLD TRADING DASHBOARD - REACT COMPONENT
 * Deployed on Vercel
 * Shows: Live price, 8 indicators, confidence score, alert history
 */

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const GoldTradingDashboard = () => {
  const [data, setData] = useState({
    currentPrice: 2045.50,
    priceHistory: [],
    confidence: 0,
    recommendation: 'WAIT',
    signals: {
      rsi: 50,
      macd: 'NEUTRAL',
      bollinger: 'NEUTRAL',
      stochastic: 50,
      sentiment: 0,
      correlation: 'NEUTRAL',
    },
    alerts: [],
    stats: {
      totalAlerts: 0,
      winRate: 0,
      accuracy: 0,
    },
  });

  // Fetch data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Dashboard fetch error:', error);
        // Use mock data if API unavailable
        generateMockData();
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const generateMockData = () => {
    const mockHistory = Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (20 - i) * 5 * 60000).toLocaleTimeString(),
      price: 2040 + Math.random() * 10,
      confidence: Math.random() * 100,
    }));

    setData(prev => ({
      ...prev,
      priceHistory: mockHistory,
    }));
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#10b981'; // Green
    if (confidence >= 70) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const getSignalEmoji = (recommendation) => {
    if (recommendation.includes('BUY')) return '🟢';
    if (recommendation.includes('SELL')) return '🔴';
    return '⭕';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">🥇 Gold Trading Signals</h1>
            <p className="text-slate-400">Real-time analysis: 10 sources + 8 AI bots</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Last update: {new Date().toLocaleTimeString()}</p>
            <p className="text-xs text-slate-500">PKT Timezone</p>
          </div>
        </div>

        {/* Main Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Current Price Card */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
            <p className="text-slate-300 text-sm mb-2">Current Price</p>
            <h2 className="text-4xl font-bold text-blue-300 mb-2">${data.currentPrice.toFixed(2)}</h2>
            <p className="text-xs text-blue-400">XAU/USD Spot Price</p>
          </div>

          {/* Recommendation Card */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
            <p className="text-slate-300 text-sm mb-2">Recommendation</p>
            <h2 className="text-3xl font-bold mb-2">
              {getSignalEmoji(data.recommendation)} {data.recommendation}
            </h2>
            <p className="text-xs text-purple-400">
              {data.signals.bullishCount || 0} BUY | {data.signals.bearishCount || 0} SELL
            </p>
          </div>

          {/* Confidence Score Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-lg p-6 border border-emerald-700">
            <p className="text-slate-300 text-sm mb-2">Confidence</p>
            <div className="flex items-center mb-2">
              <h2 className="text-4xl font-bold text-emerald-300 mr-3">{data.confidence}%</h2>
              <div className="flex-1">
                <div className="w-full bg-emerald-900 rounded-full h-3">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all"
                    style={{ width: `${data.confidence}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-emerald-400">
              {data.confidence >= 75 ? 'STRONG' : data.confidence >= 60 ? 'MODERATE' : 'WEAK'}
            </p>
          </div>

          {/* Alert Status Card */}
          <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
            <p className="text-slate-300 text-sm mb-2">Alert Status</p>
            <h2 className="text-3xl font-bold mb-2">
              {data.confidence >= 75 ? '🔔 ACTIVE' : '😴 QUIET'}
            </h2>
            <p className="text-xs text-orange-400">
              {data.alerts?.length || 0} alerts today
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Price Chart */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Price Trend (Last Hour)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.priceHistory || []}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff' }} />
                <Area type="monotone" dataKey="price" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Confidence Trend */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Confidence Score Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.priceHistory || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="confidence" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Technical Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* RSI Indicator */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <p className="text-slate-300 text-sm font-semibold">RSI</p>
              <span className="text-xs px-2 py-1 rounded bg-slate-700">Momentum</span>
            </div>
            <div className="text-3xl font-bold mb-2">
              <span style={{ color: data.signals.rsi < 30 ? '#10b981' : data.signals.rsi > 70 ? '#ef4444' : '#f59e0b' }}>
                {data.signals.rsi || 50}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(data.signals.rsi || 50) / 100 * 100}%` }} />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {data.signals.rsi < 30 ? '🟢 Oversold' : data.signals.rsi > 70 ? '🔴 Overbought' : '⭕ Neutral'}
            </p>
          </div>

          {/* MACD Indicator */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <p className="text-slate-300 text-sm font-semibold">MACD</p>
              <span className="text-xs px-2 py-1 rounded bg-slate-700">Trend</span>
            </div>
            <div className="text-3xl font-bold mb-2">
              <span style={{ color: data.signals.macd === 'BUY' ? '#10b981' : data.signals.macd === 'SELL' ? '#ef4444' : '#f59e0b' }}>
                {data.signals.macd === 'BUY' ? '🟢' : data.signals.macd === 'SELL' ? '🔴' : '⭕'}
              </span>
            </div>
            <p className="text-sm font-semibold">{data.signals.macd}</p>
            <p className="text-xs text-slate-400 mt-2">Moving Average Convergence</p>
          </div>

          {/* Bollinger Bands */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <p className="text-slate-300 text-sm font-semibold">BB</p>
              <span className="text-xs px-2 py-1 rounded bg-slate-700">Volatility</span>
            </div>
            <div className="text-3xl font-bold mb-2">
              <span style={{ color: data.signals.bollinger === 'BUY' ? '#10b981' : data.signals.bollinger === 'SELL' ? '#ef4444' : '#f59e0b' }}>
                {data.signals.bollinger === 'BUY' ? '🟢' : data.signals.bollinger === 'SELL' ? '🔴' : '⭕'}
              </span>
            </div>
            <p className="text-sm font-semibold">{data.signals.bollinger}</p>
            <p className="text-xs text-slate-400 mt-2">Bollinger Bands</p>
          </div>

          {/* Sentiment Score */}
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <p className="text-slate-300 text-sm font-semibold">Sentiment</p>
              <span className="text-xs px-2 py-1 rounded bg-slate-700">AI News</span>
            </div>
            <div className="text-3xl font-bold mb-2">
              <span style={{ color: data.signals.sentiment > 0.5 ? '#10b981' : data.signals.sentiment < -0.5 ? '#ef4444' : '#f59e0b' }}>
                {(data.signals.sentiment || 0).toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${((data.signals.sentiment || 0) + 1) / 2 * 100}%` }} />
            </div>
            <p className="text-xs text-slate-400 mt-2">FinBERT Analysis</p>
          </div>
        </div>

        {/* Performance Statistics */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <h3 className="text-lg font-semibold mb-4">Performance Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-700 rounded p-4">
              <p className="text-slate-400 text-sm mb-1">Total Signals</p>
              <p className="text-2xl font-bold text-blue-300">{data.stats.totalAlerts || 0}</p>
              <p className="text-xs text-slate-500">Last 24 hours</p>
            </div>
            <div className="bg-slate-700 rounded p-4">
              <p className="text-slate-400 text-sm mb-1">Win Rate</p>
              <p className="text-2xl font-bold text-emerald-300">{(data.stats.winRate || 0).toFixed(1)}%</p>
              <p className="text-xs text-slate-500">Trades closed</p>
            </div>
            <div className="bg-slate-700 rounded p-4">
              <p className="text-slate-400 text-sm mb-1">Accuracy</p>
              <p className="text-2xl font-bold text-amber-300">{(data.stats.accuracy || 0).toFixed(1)}%</p>
              <p className="text-xs text-slate-500">Signal accuracy</p>
            </div>
            <div className="bg-slate-700 rounded p-4">
              <p className="text-slate-400 text-sm mb-1">Active Status</p>
              <p className="text-2xl font-bold text-orange-300">24/7</p>
              <p className="text-xs text-slate-500">Monitoring on Railway</p>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {(data.alerts || []).slice(0, 5).map((alert, idx) => (
              <div key={idx} className="bg-slate-700 rounded p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{getSignalEmoji(alert.recommendation)} {alert.recommendation}</p>
                  <p className="text-xs text-slate-400">${alert.price} | Confidence: {alert.confidence}%</p>
                </div>
                <p className="text-xs text-slate-500">{alert.timestamp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm mb-2">Gold Trading System v1.0</p>
          <p className="text-slate-500 text-xs">10 signal sources • 8 AI bots • Real-time analysis • 24/7 monitoring</p>
          <p className="text-slate-600 text-xs mt-2">
            Backend: Railway.app | Frontend: Vercel | Data: Google Sheets | Alerts: Telegram
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoldTradingDashboard;
