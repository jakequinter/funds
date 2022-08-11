import { useContext } from 'react';

import { ToastContext, ToastContextType } from '../context/ToastContext';

type Type = 'success' | 'error';

export default function useToast() {
  const { setShowToast, setToastMessage, setToastType } = useContext(
    ToastContext
  ) as ToastContextType;

  function toast(type: Type, message: string) {
    setShowToast(true);
    setToastMessage(message);
    setToastType(type);
  }

  return toast;
}
