import React from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Zap,
  CheckCircle,
  Star,
  BarChart3,
  Brain,
  Users
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Time-GAN AI Model',
    description: 'Advanced neural network trained on millions of market patterns'
  },
  {
    icon: Zap,
    title: 'Real-Time Predictions',
    description: 'Get instant AI-powered predictions with <1s response time'
  },
  {
    icon: Shield,
    title: '62%+ Accuracy',
    description: 'Consistently outperform the market with proven results'
  },
  {
    icon: BarChart3,
    title: 'Portfolio Sync',
    description: 'Connect your broker and get predictions for all holdings'
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Day Trader',
    content: 'The AI predictions have completely transformed my trading strategy. 68% win rate last month!',
    rating: 5
  },
  {
    name: 'Michael Rodriguez',
    role: 'Retail Investor',
    content: 'Finally, institutional-grade tools at a price I can afford. The backtesting feature is incredible.',
    rating: 5
  },
  {
    name: 'Emma Thompson',
    role: 'Swing Trader',
    content: 'Smart alerts save me hours of market watching. I never miss a high-probability setup now.',
    rating: 5
  }
]

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      '50 predictions/month',
      'Basic technical indicators',
      'Email alerts',
      'Community access'
    ]
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    popular: true,
    features: [
      '500 predictions/month',
      'Advanced AI features',
      'Real-time alerts',
      'Portfolio sync',
      'Backtesting',
      'Priority support'
    ]
  },
  {
    name: 'Elite',
    price: '$99',
    period: '/month',
    features: [
      'Unlimited predictions',
      'Options flow data',
      'Custom models',
      'API access',
      'Discord community',
      'Personal success manager'
    ]
  }
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold gradient-text">StockPredictor AI</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">62%+ Prediction Accuracy</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI-Powered Stock Predictions
            <span className="block gradient-text">For Retail Investors</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Institutional-grade AI predictions, real-time alerts, and portfolio analysis. 
            Make smarter trades with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 glow"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="#demo" 
              className="border border-border px-8 py-3 rounded-lg hover:bg-muted transition-colors"
            >
              Watch Demo
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>15,234 Active Traders</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span>4.8/5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powered by Advanced AI Technology
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Chart */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Proven Performance Track Record
          </h2>
          
          <div className="bg-card p-8 rounded-lg border border-border">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold gradient-text">62.4%</p>
                <p className="text-muted-foreground">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-4xl font-bold gradient-text">1.2M+</p>
                <p className="text-muted-foreground">Predictions Made</p>
              </div>
              <div>
                <p className="text-4xl font-bold gradient-text"><1s</p>
                <p className="text-muted-foreground">Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 py-20" id="pricing">
        <h2 className="text-3xl font-bold text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Choose the plan that fits your trading style
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricing.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-card p-8 rounded-lg border ${
                plan.popular ? 'border-primary glow' : 'border-border'
              } relative`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/register"
                className={`block text-center py-3 rounded-lg transition-colors ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'border border-border hover:bg-muted'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trusted by Thousands of Traders
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
              
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-primary/20 to-purple-600/20 p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Making Smarter Trades?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of traders using AI to beat the market. 
            Start with 50 free predictions today.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity glow"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-semibold">StockPredictor AI</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 StockPredictor AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}