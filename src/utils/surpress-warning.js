const originalConsoleError = console.error;

console.error = function (...args) {
  const errorMessage = args[0]?.toString?.() || "";
  
  // Suppress React warnings related to Ant Design and deprecated APIs
  const suppressedWarnings = [
    "findDOMNode is deprecated",
    "findDOMNode is deprecated and will be removed",
    "Warning: Legacy context API",
    "SingleObserver",
    "ResizeObserver3",
    "Warning: componentWillMount has been renamed",
    "Warning: componentWillReceiveProps has been renamed",
    "Warning: componentWillUpdate has been renamed",
    "Warning: You are calling ReactDOM.render",
    "Warning: React.createFactory() is deprecated"
  ];
  
  const shouldSuppress = suppressedWarnings.some(warning => errorMessage.includes(warning));
  
  if (shouldSuppress) {
    return;
  }
  
  originalConsoleError.apply(console, args);
};

// Also suppress console.warn for the same warnings
const originalConsoleWarn = console.warn;

console.warn = function (...args) {
  const warningMessage = args[0]?.toString?.() || "";
  
  const suppressedWarnings = [
    "findDOMNode is deprecated",
    "findDOMNode is deprecated and will be removed",
    "Warning: Legacy context API",
    "SingleObserver",
    "ResizeObserver3"
  ];
  
  const shouldSuppress = suppressedWarnings.some(warning => warningMessage.includes(warning));
  
  if (shouldSuppress) {
    return;
  }
  
  originalConsoleWarn.apply(console, args);
};
