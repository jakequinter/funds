import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { Cancel, PlayOutline } from 'iconoir-react';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function VideoPlayer({ open, setOpen }: Props) {
  const iconVariants = {
    hover: {
      x: -2,
    },
  };

  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Trigger
        className="inline-flex items-center"
        onClick={() => setOpen(true)}
      >
        <div className="rounded-3xl">
          <div
            className="relative h-0 cursor-pointer pb-[56.25%] brightness-95 hover:brightness-90"
            onClick={() => console.log('hi')}
          >
            <Image
              className="rounded-3xl"
              src="/images/funds-howitworks-overlay.png"
              alt="funds how it works video"
              width="632"
              height="355"
            />

            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-slate-200 p-6 shadow-xl">
              <PlayOutline
                className="text-blue-500"
                fill="currentColor"
                fontSize={24}
              />
            </div>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-zinc-600 bg-opacity-50">
          <Dialog.Content className="fixed  top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white md:w-4/5">
            <div className="relative h-0 pb-[56.25%]">
              <iframe
                src="/videos/funds-howitworks.mp4"
                frameBorder="0"
                allowFullScreen
                className="absolute top-0 left-0 h-full w-full  rounded-3xl"
              />
            </div>

            <Dialog.Close className="absolute right-0 -top-20 rounded-full bg-slate-200 p-4 shadow-xl hover:bg-slate-300">
              <Cancel className="text-slate-900" fontSize={20} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
