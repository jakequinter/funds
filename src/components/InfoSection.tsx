import Image from 'next/image';

import { InfoIcon } from './InfoIcons';
import InfoIcons from './InfoIcons';

type Props = {
  order: 'first' | 'second';
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageHeight: string;
  imageWidth: string;
  items: [InfoIcon];
};

export default function InfoSection({
  order,
  heading,
  description,
  imageSrc,
  imageAlt,
  imageHeight,
  imageWidth,
  items,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-10 lg:flex-row">
      <div
        className={`${
          order === 'first'
            ? 'order-last lg:order-first'
            : 'order-last lg:order-last'
        } max-w-lg lg:max-w-sm`}
      >
        <h2 className="mb-4 text-3xl font-bold text-slate-900">{heading}</h2>
        <p className="text-lg">{description}</p>

        <InfoIcons items={items} />
      </div>

      <div>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
        />
      </div>
    </div>
  );
}
