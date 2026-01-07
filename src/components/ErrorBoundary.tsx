import { Component, type ErrorInfo, type ReactNode } from 'react';
import PremiumCard from './ui/PremiumCard';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isReporting: boolean;
  reportId: string | null;
}

/**
 * Error Boundary Component
 * Catches React component errors and displays a fallback UI
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isReporting: false,
      reportId: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
      isReporting: true
    });

    // Simulate logging to Ariya Observability Engine (Sentry-like)
    setTimeout(() => {
      const mockReportId = `ERR-${Math.random().toString(36).substring(7).toUpperCase()}`;
      console.log(`%c[Ariya Observability] Error logged: ${mockReportId}`, "color: #D0771E; font-weight: bold; background: #FFFBF0; padding: 4px; border-radius: 4px;");
      this.setState({ isReporting: false, reportId: mockReportId });
    }, 1500);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
          <PremiumCard className="max-w-2xl w-full p-8">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-black text-[#1D2939] dark:text-white uppercase tracking-tight">
                  System Interrupted
                </h1>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  An unexpected exception was isolated within this component boundary.
                </p>
              </div>

              {this.state.reportId && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-full animate-in zoom-in-95 duration-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black text-green-700 dark:text-green-400 uppercase tracking-widest">Logged to Ariya Engineering: {this.state.reportId}</span>
                </div>
              )}

              {this.state.isReporting && (
                <div className="inline-flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#D0771E]/20 border-t-[#D0771E] rounded-full animate-spin" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transmitting to Observability Engine...</span>
                </div>
              )}

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm font-mono text-red-800 dark:text-red-200 break-all">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-sm text-red-700 dark:text-red-300 cursor-pointer">
                        Stack Trace
                      </summary>
                      <pre className="mt-2 text-xs text-red-600 dark:text-red-400 overflow-auto max-h-48">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={this.handleReset}
                >
                  Try Again
                </Button>
                <Button
                  variant="secondary"
                  onClick={this.handleReload}
                >
                  Reload Page
                </Button>
              </div>
            </div>
          </PremiumCard>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

