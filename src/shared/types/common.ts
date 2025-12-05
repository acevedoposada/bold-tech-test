import type { ReactNode } from 'react';

export interface CommonProps<T = ReactNode> {
  children?: T;
}
