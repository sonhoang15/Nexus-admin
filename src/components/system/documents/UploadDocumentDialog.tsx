import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  formData: {
    title: string;
    file: File | null;
  };
  onChange: (data: { title: string; file: File | null }) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function UploadDocumentDialog({
  open,
  formData,
  onChange,
  onClose,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label>Document Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => onChange({ ...formData, title: e.target.value })}
              placeholder="Q4 Sales Report"
            />
          </div>

          <div>
            <Label>File</Label>
            <Input
              type="file"
              onChange={(e) =>
                onChange({
                  ...formData,
                  file: e.target.files?.[0] || null,
                })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={!formData.file}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
