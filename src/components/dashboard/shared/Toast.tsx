import * as RadixToast from '@radix-ui/react-toast';
import { CheckCircledOutline } from 'iconoir-react';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
};

export default function Toast({ open, setOpen, message }: Props) {
  return (
    <RadixToast.Provider>
      <RadixToast.Root open={open} onOpenChange={setOpen}>
        <div className="rounded-lg bg-white p-4 shadow-lg">
          <RadixToast.Description
            className="flex items-center"
            data-testid="toast-description"
          >
            <CheckCircledOutline className="mr-4 text-emerald-500" /> {message}
          </RadixToast.Description>
        </div>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-4 right-4 z-20" />
    </RadixToast.Provider>
  );
}
