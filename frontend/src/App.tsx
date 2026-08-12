// frontend/src/App.tsx
// import React from 'react';
import FloatingChat from './components/FloatingChat';
import './App.css';
import DataGlossary from './components/DataGlossary.tsx';

function App() {
  const exampleQueries = [
    "Show rainfall in Guntur 2022 to 2022",
    "Compare rainfall and SST in Vizag 2022",
    "What was the temperature in Hyderabad last year?",
    "Display ocean data for Chennai coast",
    "Agricultural trends in Andhra Pradesh"
  ];

  const features = [
    {
      icon: "🌊",
      title: "Ocean Data Analysis",
      description: "Get detailed sea surface temperature and ocean data for coastal regions"
    },
    {
      icon: "🌱",
      title: "Agricultural Insights",
      description: "Analyze rainfall patterns and agricultural data for informed decisions"
    },
    {
      icon: "📊",
      title: "Smart Comparisons",
      description: "Compare multiple datasets and visualize trends over time"
    }
  ];

  const aims = [
    {
      icon: "🎯",
      title: "Data Democratization",
      description: "Make complex agricultural and ocean data accessible to everyone through intuitive chat interface"
    },
    {
      icon: "⚡",
      title: "Instant Insights",
      description: "Provide real-time analysis and visualizations without technical expertise required"
    },
    {
      icon: "🌍",
      title: "Regional Focus",
      description: "Specialize in Indian coastal and agricultural data for relevant local insights"
    }
  ];

  const steps = [
    {
      number: "1",
      icon: "💬",
      title: "Ask Your Question",
      description: "Start a conversation with our AI assistant about the data you need"
    },
    {
      number: "2",
      icon: "🔍",
      title: "Intelligent Analysis",
      description: "Our AI processes your query and fetches relevant datasets"
    },
    {
      number: "3",
      icon: "📈",
      title: "Visualize Results",
      description: "Get clear visualizations and insights presented in an easy-to-understand format"
    }
  ];

  return (
    <div className="App">
      {/* Header */}
      <header className="landing-header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo">🤖</div>
            <div>
              <h1 className="header-title">FloatChat AI</h1>
              <p className="header-subtitle">
                Intelligent chat interface for agricultural and ocean data analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="section">
        <div className="section-content">
          <div className="section-header">
            <div className="section-icon">🚀</div>
            <h2 className="section-title">Welcome to FloatChat AI</h2>
          </div>
          <div className="intro-content">
            <div className="intro-text">
              <p>
                FloatChat AI revolutionizes how you interact with <span className="intro-highlight">agricultural and oceanographic data</span>. 
                Our intelligent chatbot provides instant access to complex datasets through simple, natural conversations.
                The project focuses on making communication simple, quick, and accessible by integrating natural language processing (NLP) features that allow users to ask questions in plain language and receive clear, contextual answers.
              </p>
              <p style={{marginTop: '1rem'}}>
                The system is user-friendly, extendable for future datasets, and has the potential to bring valuable insights to both agriculture and climate research.
                Whether you're a researcher, farmer, or environmental enthusiast, get the insights you need without 
                technical barriers. <span className="intro-highlight">Ask, visualize, and understand</span> - it's that simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aim Section */}
      <section className="section section-alt">
        <div className="section-content">
          <div className="section-header">
            <div className="section-icon">🎯</div>
            <h2 className="section-title">Our Mission</h2>
          </div>
          <div className="aim-grid">
            {aims.map((aim, index) => (
              <div key={index} className="aim-card">
                <div className="aim-icon">{aim.icon}</div>
                <h3 className="aim-title">{aim.title}</h3>
                <p className="aim-description">{aim.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="section-content">
          <div className="section-header">
            <div className="section-icon">✨</div>
            <h2 className="section-title">Key Features</h2>
          </div>
          <div className="features-container">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section section-alt">
        <div className="section-content">
          <div className="section-header">
            <div className="section-icon">🔧</div>
            <h2 className="section-title">How It Works</h2>
          </div>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="section">
        <div className="section-content">
          <div className="section-header">
            <div className="section-icon">💡</div>
            <h2 className="section-title">Try These Examples</h2>
          </div>
          <div className="examples-container">
            <p>Get started with these sample queries:</p>
            <div className="example-queries">
              {exampleQueries.map((query, index) => (
                <div key={index} className="query-bubble">
                  {query}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Data Glossary Section */}
      <section className="section section-alt">
        <div className="section-content">
          <div className="section-header">
            <div className="section-icon">📚</div>
            <h2 className="section-title">Data Glossary</h2>
          </div>
          <DataGlossary />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>FloatChat AI</h3>
            <p>Revolutionizing data interaction through intelligent chat interfaces for agricultural and oceanographic insights.</p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: info@floatchatai.com</p>
            <p>Phone: +91 XXXXX XXXXX</p>
          </div>
          <div className="footer-section">
            <h3>Data Sources</h3>
            <p>Agricultural Data • Oceanographic Data • Meteorological Data • Regional Statistics</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 FloatChat AI. All rights reserved.</p>
        </div>
      </footer>

      <FloatingChat />
    </div>
  );
}

export default App;