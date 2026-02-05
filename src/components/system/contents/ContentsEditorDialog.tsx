import { TPage, TPageStatus } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/libs/utils";

type Props = {
  open: boolean;
  editingPage: TPage | null;
  formData: {
    title: string;
    slug: string;
    content: string;
    status: TPageStatus;
  };
  onClose: () => void;
  onChange: (data: Props["formData"]) => void;
  onSubmit: () => void;
};

export function ContentsEditorDialog({
  open,
  editingPage,
  formData,
  onClose,
  onChange,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingPage ? "Edit Content Page" : "Create Content Page"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label>Page Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => onChange({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <Label>Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) =>
                onChange({ ...formData, content: e.target.value })
              }
              className="min-h-[300px]"
            />
          </div>

          <div>
            <Label>Status</Label>
            <div className="flex gap-2">
              {(["PUBLISHED", "DRAFT"] as TPageStatus[]).map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={formData.status === s ? "default" : "outline"}
                  className={cn(
                    s === "PUBLISHED" && formData.status === s && "bg-success",
                  )}
                  onClick={() => onChange({ ...formData, status: s })}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            {editingPage ? "Update Page" : "Create Page"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
