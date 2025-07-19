import React from 'react'
import { useAuth } from '../lib/auth'
import { 
  TrendingUp,
  DollarSign,
  BarChart3,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  {
    label: 'Total Predictions',
    value: '156',
    change: '+12%',
    trend: 'up',
    icon: BarChart3
  },
  {
    label: 'Win Rate',
    value: '64.2%',
    change: '+2.3%',
    trend: 'up',
    icon: TrendingUp
  },
  {
    label: 'Active Alerts',
    value: '8',
    change: '3 triggered today',
    trend: 'neutral',
    icon: Bell
  },
  {
    label: 'Portfolio Value',
    value: '$45,231',
    change: '+5.4%',
    trend: 'up',
    icon: DollarSign
  }
]

const recentPredictions = [
  {
    ticker: 'AAPL',
    direction: 'up',
    probability: 0.73,
    confidence: 0.82,
    time: '2 hours ago'
  },
  {
    ticker: 'TSLA',
    direction: 'down',
    probability: 0.68,
    confidence: 0.71,
    time: '4 hours ago'
  },
  {
    ticker: 'NVDA',
    direction: 'up',
    probability: 0.81,
    confidence: 0.89,
    time: '5 hours ago'
  },
  {
    ticker: 'MSFT',
    direction: 'up',
    probability: 0.65,
    confidence: 0.68,
    time: '8 hours ago'
  }
]

const topMovers = [
  { ticker: 'NVDA', change: '+5.2%', volume: '125M' },
  { ticker: 'AMD', change: '+3.8%', volume: '89M' },
  { ticker: 'COIN', change: '-4.1%', volume: '45M' },
  { ticker: 'PLTR', change: '+2.9%', volume: '67M' }
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.username}!</h1>
          <p className="text-muted-foreground mt-1">
            Here's your trading overview for today
          </p>
        </div>
        
        <Link
          to="/app/predictions"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          New Prediction
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8 text-primary" />
              <span className={`text-sm ${
                stat.trend === 'up' ? 'text-green-500' : 
                stat.trend === 'down' ? 'text-red-500' : 
                'text-muted-foreground'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Predictions */}
        <div className="lg:col-span-2 bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Predictions</h2>
            <Link to="/app/predictions" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentPredictions.map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    prediction.direction === 'up' ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}>
                    {prediction.direction === 'up' ? (
                      <ArrowUpRight className="w-5 h-5 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  
                  <div>
                    <p className="font-semibold">{prediction.ticker}</p>
                    <p className="text-sm text-muted-foreground">{prediction.time}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">
                    {(prediction.probability * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {(prediction.confidence * 100).toFixed(0)}% confidence
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Movers */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Top Movers</h2>
          
          <div className="space-y-3">
            {topMovers.map((stock, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{stock.ticker}</p>
                  <p className="text-sm text-muted-foreground">Vol: {stock.volume}</p>
                </div>
                
                <span className={`font-semibold ${
                  stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stock.change}
                </span>
              </div>
            ))}
          </div>
          
          <Link
            to="/app/predictions"
            className="mt-4 w-full bg-primary/10 text-primary py-2 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Analyze Movers
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/app/portfolio"
            className="bg-card p-4 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <h3 className="font-semibold mb-1">Sync Portfolio</h3>
            <p className="text-sm text-muted-foreground">
              Connect your broker for AI insights
            </p>
          </Link>
          
          <Link
            to="/app/alerts"
            className="bg-card p-4 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <h3 className="font-semibold mb-1">Set Alerts</h3>
            <p className="text-sm text-muted-foreground">
              Never miss high-probability trades
            </p>
          </Link>
          
          <Link
            to="/app/education"
            className="bg-card p-4 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <h3 className="font-semibold mb-1">Learn AI Trading</h3>
            <p className="text-sm text-muted-foreground">
              Master prediction strategies
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}