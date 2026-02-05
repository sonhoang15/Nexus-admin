import { useEffect, useState } from "react";
import { TSetting } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Info, Terminal } from "lucide-react";

interface Props {
  open: boolean;
  setting: TSetting | null;
  onClose: () => void;
  onSubmit: (payload: {
    configKey: string;
    description: string;
    configData: any;
  }) => void;
}

export function SettingsFormDialog({
  open,
  setting,
  onClose,
  onSubmit,
}: Props) {
  const [formData, setFormData] = useState({
    configKey: "",
    description: "",
    configData: "{\n  \n}",
  });
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    if (setting) {
      setFormData({
        configKey: setting.configKey,
        description: setting.description,
        configData: JSON.stringify(setting.configData, null, 2),
      });
    } else {
      setFormData({
        configKey: "",
        description: "",
        configData: "{\n  \n}",
      });
    }
    setJsonError("");
  }, [setting]);

  const validateJson = (value: string) => {
    try {
      JSON.parse(value);
      setJsonError("");
      return true;
    } catch {
      setJsonError("Invalid JSON format");
      return false;
    }
  };

  const handleSubmit = () => {
    if (!validateJson(formData.configData)) return;

    onSubmit({
      configKey: formData.configKey,
      description: formData.description,
      configData: JSON.parse(formData.configData),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>
              {setting ? "Update Setting" : "Add Setting"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Configuration Key</Label>
              <Input
                value={formData.configKey}
                disabled={!!setting}
                onChange={(e) =>
                  setFormData({ ...formData, configKey: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Label>Configuration Data (JSON)</Label>
            <Textarea
              value={formData.configData}
              onChange={(e) => {
                setFormData({ ...formData, configData: e.target.value });
                validateJson(e.target.value);
              }}
              className="font-mono min-h-[200px]"
            />
            {jsonError && (
              <p className="text-xs text-destructive mt-1">{jsonError}</p>
            )}
          </div>

          <div className="flex gap-2 p-4 bg-muted rounded-lg text-sm">
            <Info className="h-4 w-4 mt-0.5" />
            <ul className="list-disc list-inside">
              <li>Use double quotes</li>
              <li>No trailing commas</li>
              <li>Close all braces</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {setting ? "Update Config" : "Create Setting"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
