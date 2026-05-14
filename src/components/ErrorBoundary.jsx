import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'white', background: '#111827', minHeight: '100vh' }}>
          <h2 style={{ color: '#ef4444' }}>Something went wrong.</h2>
          <p style={{ margin: '1rem 0', color: '#9ca3af' }}>{this.state.error?.message || "Unknown error"}</p>
          <button 
            onClick={() => {
                localStorage.clear();
                window.location.href = '/';
            }}
            style={{ 
                padding: '0.75rem 1.5rem', 
                background: '#6366f1', 
                border: 'none', 
                borderRadius: '0.5rem', 
                color: 'white',
                cursor: 'pointer'
            }}
          >
            Reset App (Clear Cache)
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;