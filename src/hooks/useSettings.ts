import { useState } from "react";
import { mockSettings } from "@/data/mockData";
import { TSetting } from "@/types";

type ViewMode = "table" | "form";

export function useSettings() {
  const [settings, setSettings] = useState<TSetting[]>(mockSettings);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editingSetting, setEditingSetting] = useState<TSetting | null>(null);

  const filteredSettings = settings.filter(
    (s) =>
      s.configKey.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    setEditingSetting(null);
    setViewMode("form");
  };

  const handleEdit = (setting: TSetting) => {
    setEditingSetting(setting);
    setViewMode("form");
  };

  const handleDelete = (id: string) => {
    setSettings(settings.filter((s) => s.id !== id));
  };

  const handleSubmit = (payload: {
    configKey: string;
    description: string;
    configData: any;
  }) => {
    const today = new Date().toISOString().split("T")[0];

    if (editingSetting) {
      setSettings(
        settings.map((s) =>
          s.id === editingSetting.id
            ? {
                ...s,
                description: payload.description,
                configData: payload.configData,
                updatedAt: today,
              }
            : s,
        ),
      );
    } else {
      setSettings([
        ...settings,
        {
          id: Date.now().toString(),
          ...payload,
          createdAt: today,
          updatedAt: today,
        },
      ]);
    }

    setEditingSetting(null);
    setViewMode("table");
  };

  const handleCancel = () => {
    setEditingSetting(null);
    setViewMode("table");
  };

  return {
    settings: filteredSettings,
    search,
    viewMode,
    editingSetting,

    setSearch,

    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
  };
}
