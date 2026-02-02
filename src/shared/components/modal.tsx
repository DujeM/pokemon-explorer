import type { ReactNode } from "react";
import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="
          relative z-10
          bg-white border-4 border-black rounded-xl
          shadow-[8px_8px_0_#000]
          w-full max-w-xl
          p-6
          max-h-[90vh]
          overflow-y-auto
          animate-modal-in
        "
      >
        {children}
      </div>
    </div>
  );
}
