import { type ClassValue, clsx } from 'clsx';
import { twMerge as baseTwMerge } from 'tailwind-merge';

export function tw(...inputs: ClassValue[]) {
  return baseTwMerge(clsx(inputs));
}
