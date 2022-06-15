import { Coin } from 'iconoir-react';

export default function Spinner() {
  return (
    <div data-testid="spinner">
      <Coin className="animate-spin text-emerald-500" />
    </div>
  );
}
