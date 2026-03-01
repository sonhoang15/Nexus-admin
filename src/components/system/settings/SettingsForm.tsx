import { useEffect, useState } from "react";
import { ISetting } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Info, Terminal } from "lucide-react";
import { CreateSettingDto, IUpdateSettingDto } from "@/types";

interface ISettingsFormProps {
  setting: ISetting | null;
  onCancel: () => void;
  onSubmit: (payload: CreateSettingDto | IUpdateSettingDto) => void;
  submitting?: boolean;
}

export function SettingsForm({
  setting,
  onCancel,
  onSubmit,
  submitting,
}: ISettingsFormProps) {
  const [formData, setFormData] = useState<{
    configKey: string;
    description: string;
    configData: string;
  }>({
    configKey: "",
    description: "",
    configData: "{\n  \n}",
  });

  const [jsonError, setJsonError] = useState<string | null>(null);

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

  // Strict JSON validation (không thay đổi logic chính)
  const validateJson = (value: string): { valid: boolean; parsed?: any } => {
    if (!value.trim()) {
      setJsonError("JSON content is required");
      return { valid: false };
    }

    try {
      const parsed = JSON.parse(value);

      // Optional strict rule: phải là object
      if (typeof parsed !== "object" || parsed === null) {
        setJsonError("JSON must be a valid object");
        return { valid: false };
      }

      setJsonError("");
      return { valid: true, parsed };
    } catch {
      setJsonError("Invalid JSON format");
      return { valid: false };
    }
  };

  const handleSubmit = () => {
    const result = validateJson(formData.configData);

    if (!result.valid) return;

    const parsed = result.parsed;

    if (setting) {
      const payload: IUpdateSettingDto = {
        description: formData.description,
        configData: parsed,
      };

      onSubmit(payload);
    } else {
      const payload: CreateSettingDto = {
        configKey: formData.configKey,
        description: formData.description,
        configData: parsed,
      };

      onSubmit(payload);
    }
  };

  const isFormInvalid =
    submitting ||
    !!jsonError ||
    !formData.description.trim() ||
    !formData.configData.trim() ||
    (!setting && !formData.configKey.trim());

  return (
    <div className="bg-card border rounded-lg p-6 space-y-6 shadow-md shadow-black/10">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Terminal className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold">
          {setting ? "Update Setting" : "Add Setting"}
        </h2>
      </div>

      <div className="space-y-4">
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
              const value = e.target.value;
              setFormData({ ...formData, configData: value });
              validateJson(value);
            }}
            className={`font-mono min-h-[200px] ${
              jsonError ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
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

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={isFormInvalid}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          {submitting
            ? "Processing..."
            : setting
              ? "Update Config"
              : "Create Setting"}
        </Button>
      </div>
    </div>
  );
}
