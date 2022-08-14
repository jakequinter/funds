export type InfoIcon = {
  key: string;
  icon: React.ReactElement;
  description: string;
};

type Props = {
  items: [InfoIcon];
};

export default function InfoIcons({ items }: Props) {
  return (
    <>
      {items.map(item => (
        <div key={item.key} className="mt-8 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-slate-200 p-2 text-lg text-slate-900">
              {item.icon}
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
