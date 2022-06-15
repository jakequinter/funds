import { createContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export type ToastContextType = {
  showToast: boolean;
  setShowToast: (showToast: boolean) => void;
  toastMessage: string;
  setToastMessage: (toastMessage: string) => void;
  toastType: string;
  setToastType: (toastSuccess: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastContextProvider = ({ children }: Props) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  return (
    <ToastContext.Provider
      value={{
        showToast,
        setShowToast,
        toastMessage,
        setToastMessage,
        toastType,
        setToastType,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
