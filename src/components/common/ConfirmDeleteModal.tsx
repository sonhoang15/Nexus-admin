import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  loading?: boolean;
  entityName?: string;
  itemName?: string;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDeleteModal({
  open,
  loading = false,
  entityName = "item",
  itemName,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  const finalTitle = title ?? `Delete ${entityName}`;
  const finalDescription =
    description ??
    `Are you sure you want to delete this ${entityName}${
      itemName ? ` "${itemName}"` : ""
    }? This action cannot be undone.`;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-gray-900">{finalTitle}</h2>

        <p className="mt-4 text-base text-gray-600">{finalDescription}</p>

        <div className="mt-8 flex justify-end gap-4">
          <Button onClick={onCancel} disabled={loading} className="px-6 py-2">
            {cancelText}
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 px-6 py-2 text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
