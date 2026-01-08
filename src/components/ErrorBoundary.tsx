"use client";
import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // log to console (or a logging service)
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="p-4 bg-red-50 text-red-700">
          Something went wrong. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}
