import * as RadixToast from '@radix-ui/react-toast';
import { CheckCircledOutline, DeleteCircledOutline } from 'iconoir-react';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
  type: string;
};

export default function Toast({ open, setOpen, message, type }: Props) {
  return (
    <RadixToast.Provider>
      <RadixToast.Root open={open} onOpenChange={setOpen} duration={3000}>
        <div
          data-testid="toast"
          className="w-80 rounded-lg bg-white p-4 shadow-xl"
        >
          <div className="flex">
            {type === 'success' ? (
              <CheckCircledOutline className="mt-0.5 h-4 w-4 rounded-full text-emerald-500" />
            ) : (
              <DeleteCircledOutline className="mt-0.5 h-4 w-4 rounded-full text-red-500" />
            )}
            <div className="ml-4">
              <RadixToast.Title className="text-sm font-medium">
                {type === 'success' ? 'Success' : 'Error'}
              </RadixToast.Title>

              <RadixToast.Description className="mt-1 text-sm">
                {message}
              </RadixToast.Description>
            </div>
          </div>
        </div>
      </RadixToast.Root>
      <RadixToast.Viewport className="fixed bottom-4 right-4 z-20" />
    </RadixToast.Provider>
  );
}
