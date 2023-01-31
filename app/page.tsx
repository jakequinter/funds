import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/logo.png" alt="Logo" width={200} height={200} />
      <h1 className="text-xl font-bold text-neutral-600 opacity-30 mt-2">
        Coming soon...
      </h1>
    </div>
  );
}
