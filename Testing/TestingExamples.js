// Testing with Jest (example)

// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// math.test.js
import { add, subtract } from './math';

describe('Math functions', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtracts two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});

// React Testing (if applicable)
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// Unit Test Example without framework
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function add(a, b) {
  return a + b;
}

try {
  assert(add(2, 3) === 5, 'Add function should return 5');
  assert(add(-1, 1) === 0, 'Add function should handle negatives');
  console.log('All tests passed');
} catch (error) {
  console.error(error.message);
}