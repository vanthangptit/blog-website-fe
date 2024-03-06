import { toast } from 'react-toastify';

type Type = 'success' | 'warn' | 'error';

export const toasts = (type: Type, message: string) => {
  return toast[type](message);
};
