import { Button } from "@/components/ui/button";

type Props = {
  submitText: string;
  onCancel: () => void;
};

export function FormActions({ submitText, onCancel }: Props) {
  return (
    <div className="flex justify-end gap-3 pt-6">
      <Button
        variant="outline"
        className="rounded-xl px-6 !bg-red-500 hover:!bg-red-600 text-white"
        onClick={onCancel}
      >
        Discard
      </Button>

      <Button className="rounded-xl px-6 bg-green-500 hover:bg-green-600 text-white">
        {submitText}
      </Button>
    </div>
  );
}
