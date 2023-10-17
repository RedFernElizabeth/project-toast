import React from 'react';

import useKeyDown from '../../hooks/use-keydown';

export const ToastContext = React.createContext();

function ToastProvider({children}) {
  const [toasts, setToasts] = React.useState([]);

  // Dismiss all toasts if 'ESC' is pressed
  // Use memoization to prevent the callback from being regenerated on every render 
  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, [])

  useKeyDown('Escape', handleEscape);

  function createToast(message, variant) {
    // Create new toast object
    const newToast = {
      id: crypto.randomUUID(),
      message,
      variant
    };

    // Clone the existing array, then add the new toast object
    const nextToasts = [...toasts, newToast];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    // Create a new array that includes all of the toasts except the one we want to remove
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider value={{
      toasts,
      createToast,
      dismissToast
    }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
