import '@testing-library/jest-dom'

const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn((...args) => {
    if (typeof args[0] === 'string' && args[0].includes('cannot be a child of')) {
      return;
    }
    originalError(...args);
  });
})

jest.mock('motion/react', () => ({
  ...jest.requireActual('motion/react'),
  AnimatePresence: ({ children }: any) => children
}))