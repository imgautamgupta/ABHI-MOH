'use client';

import React, { Component, ErrorInfo, ReactNode, useEffect, useState } from 'react';

let cachedWebGLSupport: boolean | null = null;

/**
 * Safely determines if WebGL / WebGL2 is available in the user's environment.
 * Immediately releases the test context using WEBGL_lose_context so it does not
 * consume one of the browser's scarce WebGL context slots.
 */
export function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  if (cachedWebGLSupport !== null) return cachedWebGLSupport;

  try {
    const canvas = document.createElement('canvas');
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;

    // Check WebGL2 first, then standard WebGL, then experimental
    if (window.WebGL2RenderingContext) {
      gl = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    }
    if (!gl && window.WebGLRenderingContext) {
      gl = (canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    }

    if (!gl) {
      cachedWebGLSupport = false;
      return false;
    }

    // Check if context is already lost
    if (typeof gl.isContextLost === 'function' && gl.isContextLost()) {
      cachedWebGLSupport = false;
      return false;
    }

    // Release the test context immediately to avoid exhausting GPU context limit
    const loseContextExt = gl.getExtension('WEBGL_lose_context');
    if (loseContextExt) {
      loseContextExt.loseContext();
    }

    cachedWebGLSupport = true;
    return true;
  } catch (err) {
    console.warn('WebGL support probe encountered an exception:', err);
    cachedWebGLSupport = false;
    return false;
  }
}

/**
 * Hook to check WebGL availability on the client without SSR mismatch.
 */
export function useWebGLAvailability(): boolean {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  useEffect(() => {
    setIsAvailable(checkWebGLSupport());
  }, []);

  return isAvailable;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log gracefully without crashing the UI
    console.warn('WebGL Canvas runtime error caught by boundary; displaying fallback:', error?.message || error, errorInfo);
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
  className?: string;
}

/**
 * High-reliability wrapper for Three.js / React Three Fiber Canvases.
 * Prevents WebGL context failures from breaking the page or crashing the application.
 */
export const WebGLCanvasWrapper: React.FC<WebGLCanvasWrapperProps> = ({
  children,
  fallback,
  className,
}) => {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setIsSupported(checkWebGLSupport());
  }, []);

  // During SSR or while probing client capabilities, render the elegant fallback
  if (isSupported === null || !isSupported) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <WebGLErrorBoundary fallback={<div className={className}>{fallback}</div>}>
      <div className={className || 'w-full h-full'}>
        {children}
      </div>
    </WebGLErrorBoundary>
  );
};

WebGLCanvasWrapper.displayName = 'WebGLCanvasWrapper';
