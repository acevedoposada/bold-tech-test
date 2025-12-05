import attempt from './attempt';

describe('Attemp fn', () => {
  it('should return [data, null] when function resolves successfully', async () => {
    const mockFn = jest.fn().mockResolvedValue({ id: 1, name: 'Test' });

    const [data, error] = await attempt(mockFn);

    expect(data).toEqual({ id: 1, name: 'Test' });
    expect(error).toBeNull();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should return [null, error] when function rejects', async () => {
    const testError = new Error('Test error');
    const mockFn = jest.fn().mockRejectedValue(testError);

    const [data, error] = await attempt(mockFn);

    expect(data).toBeNull();
    expect(error).toEqual(testError);
    expect(mockFn).toHaveBeenCalled();
  });
});
