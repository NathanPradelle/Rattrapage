export type ButtonColor = 'beige' | 'red' | 'other';

export interface ButtonProps {
  color: ButtonColor | null;
  className?: string | null;
  disabled?: boolean | null;
  loading?: boolean | null;
  to?: string | null;
}
