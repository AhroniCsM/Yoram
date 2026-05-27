// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// jsdom polyfills used by framer-motion's whileInView.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  root = null;
  rootMargin = '';
  thresholds = [];
}
(global as any).IntersectionObserver = MockIntersectionObserver;
