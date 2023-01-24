// We're going to use a feature called componentDidCatch to handle this. This is something you can't do with hooks so if you needed this sort of functionality you'd have to use a class component.
// A component can only catch errors in its children, so it cannot catch its own errors. This will be wrapper for Details to catch it's errors
import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component<{ children: ReactElement }> {
  state = { hasError: false };

  // It's static because React has to call directly on the class, not new instance of the class "ErrorBoundary.getDerivedStateFromError(error)"
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // This (and the static func above) is why we use class components because there is no equivalent in functional components.
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page.
        </h2>
      );
    }

    // If there is no error just show Details seamlessly
    return this.props.children;
  }
}

export default ErrorBoundary;
