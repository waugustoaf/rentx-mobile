import Toast from 'react-native-toast-message';

interface ToastProps {
  title: string;
  body: string;
}

export const toast = {
  success: ({ title, body }: ToastProps) => {
    return Toast.show({
      type: 'success',
      text1: title,
      text2: body,
      position: 'bottom',
    });
  },
  error: ({ title, body }: ToastProps) => {
    return Toast.show({
      type: 'error',
      text1: title,
      text2: body,
      position: 'bottom',
    });
  },
  info: ({ title, body }: ToastProps) => {
    return Toast.show({
      type: 'info',
      text1: title,
      text2: body,
      position: 'bottom',
    });
  },
};
