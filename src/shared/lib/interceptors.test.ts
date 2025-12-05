import axios from 'axios';

jest.mock('axios');

describe('apiInstance interceptors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create axios instance with correct baseURL', () => {
    const mockInterceptor = jest.fn();
    (axios.create as jest.Mock).mockReturnValue({
      interceptors: {
        response: {
          use: mockInterceptor,
        },
      },
    });

    jest.isolateModules(() => {
      require('./interceptors');
    });

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
  });

  it('should register response interceptor handler', () => {
    const handlers: Function[] = [];

    (axios.create as jest.Mock).mockReturnValue({
      interceptors: {
        response: {
          use: jest.fn((handler) => {
            handlers.push(handler);
            return jest.fn();
          }),
        },
      },
    });

    jest.isolateModules(() => {
      require('./interceptors');
    });

    expect(handlers.length).toBe(1);
    expect(typeof handlers[0]).toBe('function');
  });

  it('should return response.data from interceptor', () => {
    const handlers: Function[] = [];

    (axios.create as jest.Mock).mockReturnValue({
      interceptors: {
        response: {
          use: jest.fn((handler) => {
            handlers.push(handler);
            return jest.fn();
          }),
        },
      },
    });

    jest.isolateModules(() => {
      require('./interceptors');
    });

    const handler = handlers[0];
    const mockResponse = {
      status: 200,
      data: { id: 1, name: 'Test User' },
      headers: { 'content-type': 'application/json' },
      config: {},
    };

    const result = handler(mockResponse);

    expect(result).toEqual({ id: 1, name: 'Test User' });
    expect(result).toBe(mockResponse.data);
  });

  it('should preserve various data types from response', () => {
    const handlers: Function[] = [];

    (axios.create as jest.Mock).mockReturnValue({
      interceptors: {
        response: {
          use: jest.fn((handler) => {
            handlers.push(handler);
            return jest.fn();
          }),
        },
      },
    });

    jest.isolateModules(() => {
      require('./interceptors');
    });

    const handler = handlers[0];

    const testCases = [
      { data: 'string', expected: 'string' },
      { data: 123, expected: 123 },
      { data: [1, 2, 3], expected: [1, 2, 3] },
      {
        data: { nested: { value: true } },
        expected: { nested: { value: true } },
      },
      { data: null, expected: null },
      { data: undefined, expected: undefined },
    ];

    testCases.forEach(({ data, expected }) => {
      const response = { status: 200, data, headers: {} };
      const result = handler(response);
      expect(result).toEqual(expected);
    });
  });
});
