import { createContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export const ToastContext = createContext<any>(null);

export const ToastContextProvider = ({ children }: Props) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  return (
    <ToastContext.Provider
      value={{ showToast, setShowToast, toastMessage, setToastMessage }}
    >
      {children}
    </ToastContext.Provider>
  );
};
