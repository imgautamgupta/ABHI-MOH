'use client';

import React, { Component, ErrorInfo, ReactNode, useEffect, useState } from 'react';

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL rendering error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export interface WebGLCanvasWrapperProps {
  children: ReactNode;
  fallback: ReactNode;
}

export const WebGLCanvasWrapper: React.FC<WebGLCanvasWrapperProps> = ({ children, fallback }) => {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setIsSupported(checkWebGLSupport());
  }, []);

  // SSR or while checking: show fallback
  if (isSupported === null || !isSupported) {
    return <>{fallback}</>;
  }

  return <WebGLErrorBoundary fallback={fallback}>{children}</WebGLErrorBoundary>;
};
