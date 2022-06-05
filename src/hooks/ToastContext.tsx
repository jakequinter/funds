import { createContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export type ToastContextType = {
  showToast: boolean;
  setShowToast: (showToast: boolean) => void;
  toastMessage: string;
  setToastMessage: (toastMessage: string) => void;
  toastSuccess: boolean;
  setToastSuccess: (toastSuccess: boolean) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastContextProvider = ({ children }: Props) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSuccess, setToastSuccess] = useState(false);

  return (
    <ToastContext.Provider
      value={{
        showToast,
        setShowToast,
        toastMessage,
        setToastMessage,
        toastSuccess,
        setToastSuccess,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
