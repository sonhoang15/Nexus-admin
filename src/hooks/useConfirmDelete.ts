import { useState } from "react";

export const useConfirmDelete = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const confirm = (callback: () => void) => {
    setOnConfirm(() => callback);
    setOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return {
    open,
    confirm,
    handleConfirm,
    close: () => setOpen(false),
  };
};
