import { PiggyBank } from 'iconoir-react';

export default function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center text-lg">
      <PiggyBank className="mr-4 animate-bounce text-emerald-500" />
      <p>{label}</p>
    </div>
  );
}
