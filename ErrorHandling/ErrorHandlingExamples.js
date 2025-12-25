// Error Handling in JavaScript

// Try-Catch for synchronous errors
try {
  let result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error('An error occurred:', error.message);
}

// Custom Error Classes
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateAge(age) {
  if (age < 0) {
    throw new ValidationError('Age cannot be negative');
  }
  return true;
}

try {
  validateAge(-5);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation Error:', error.message);
  }
}

// Async Error Handling
async function asyncOperation() {
  try {
    await riskyAsyncOperation();
  } catch (error) {
    console.error('Async error:', error);
  }
}

// Global Error Handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});