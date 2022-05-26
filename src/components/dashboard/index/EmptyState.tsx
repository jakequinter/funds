import React from 'react';
import toast from 'react-hot-toast';

export default function EmptyState() {
  const handleAddInstance = async () => {
    try {
      const res = await fetch('/api/instance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        }),
      });

      if (res.ok) {
        toast.success('Expense added successfully.');
      } else {
        toast.error('There was an issue adding your expense.');
      }
    } catch (error) {
      toast.error('There was an issue adding your expense.');
    }
  };

  return (
    <div className="mt-12 rounded-lg bg-white p-8 text-center shadow-lg">
      <h1 className="text-2xl font-semibold text-slate-900">Welcome to Tin</h1>

      <p className="mt-4 mb-8">
        You currently don&apos;t have a budget started for this month.
      </p>

      <button
        type="button"
        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow hover:border-slate-400 focus:outline-none focus:ring-0"
        onClick={handleAddInstance}
      >
        Start new month
      </button>
    </div>
  );
}
