import React from 'react';
import { createRoot } from 'react-dom/client';
import App, { Toaster } from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null, info: null }; }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, info) { this.setState({ error, info }); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', background: '#fee2e2', minHeight: '100vh' }}>
          <h1 style={{ color: '#b91c1c' }}>Something went wrong.</h1>
          <p>Please send this screenshot to your developer:</p>
          <pre style={{ background: '#fef2f2', padding: '10px', overflowX: 'auto', border: '1px solid #fca5a5' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.info && this.state.info.componentStack}
          </pre>
          <button 
            onClick={() => {
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                  }
                  window.location.reload(true);
                }).catch(() => window.location.reload(true));
              } else {
                window.location.reload(true);
              }
            }} 
            style={{ marginTop: '20px', padding: '10px 20px', background: '#b91c1c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Hard Reload Page & Clear Cache
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <Toaster
      position="top-center"
      toastOptions={{ style: { background: '#1e293b', color: '#fff', borderRadius: '12px' } }}
    />
    <App />
  </ErrorBoundary>
);
