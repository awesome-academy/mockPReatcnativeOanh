import React, { createContext, useContext, useState, ReactNode } from 'react';
import ConfirmModal from '@/components/organisms/product/ConfirmModal';

type ConfirmOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmContextType = {
  confirm: (options?: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(
    null,
  );

  const confirm = (opts?: ConfirmOptions) => {
    return new Promise<boolean>(resolve => {
      setOptions(opts || {});
      setResolver(() => resolve);
      setVisible(true);
    });
  };

  const handleClose = () => {
    reset();
    resolver?.(false);
  };

  const handleConfirm = () => {
    reset();
    resolver?.(true);
  };

  const reset = () => {
    setVisible(false);
    setOptions(null);
    setResolver(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmModal
        visible={visible}
        title={options?.title}
        message={options?.message}
        confirmText={options?.confirmText}
        cancelText={options?.cancelText}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirmDialog() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirmDialog must be used within ConfirmProvider');
  }
  return context.confirm;
}
