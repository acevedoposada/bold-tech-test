async function attempt<T>(
  fn: (...args: any[]) => Promise<T>,
  ...args: Parameters<typeof fn>
): Promise<[T | null, Error | null]> {
  try {
    const data = await fn(...args);
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export default attempt;
