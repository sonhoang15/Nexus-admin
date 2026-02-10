import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDeleteModal({
  open,
  loading,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">Confirm delete</h2>

        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
