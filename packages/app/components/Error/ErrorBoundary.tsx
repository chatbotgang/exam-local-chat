import * as React from "react";

interface IErrorBoundaryProps {
  errorComponent: React.ReactNode;
  children: React.ReactNode;
}
export interface IErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    // initialize the error state
    this.state = { hasError: false };
  }

  // if an error happened, set the state to true
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    // if error happened, return a fallback component
    if (this.state.hasError) {
      return <>Oh no! fail!</>;
    }

    return this.props.children;
  }
}
