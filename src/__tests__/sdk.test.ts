import { describe, it, expect } from 'vitest';
import { SDK } from '../index';

describe('SDK', () => {
  it('should create an instance', () => {
    const sdk = new SDK({});
    expect(sdk).toBeInstanceOf(SDK);
  });

  it('should say hello', () => {
    const sdk = new SDK({});
    expect(sdk.hello('World')).toBe('Hello World!');
  });
});