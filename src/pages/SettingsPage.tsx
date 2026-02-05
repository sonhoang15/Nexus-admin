import { useState } from "react";
import { mockSettings } from "@/data/mockData";
import { TSetting } from "@/types";
import { SettingsSearchBar } from "@/components/system/settings/SettingsSearchBar";
import { SettingsTable } from "@/components/system/settings/SettingsTable";
import { SettingsFormDialog } from "@/components/system/settings/SettingsFormDialog";

export default function SettingsPage() {
  const [settings, setSettings] = useState<TSetting[]>(mockSettings);
  const [search, setSearch] = useState("");
  const [editingSetting, setEditingSetting] = useState<TSetting | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredSettings = settings.filter(
    (s) =>
      s.configKey.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    setSettings(settings.filter((s) => s.id !== id));
  };

  const handleSubmit = (payload: {
    configKey: string;
    description: string;
    configData: any;
  }) => {
    if (editingSetting) {
      setSettings(
        settings.map((s) =>
          s.id === editingSetting.id
            ? {
                ...s,
                description: payload.description,
                configData: payload.configData,
                updatedAt: new Date().toISOString().split("T")[0],
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
          createdAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        },
      ]);
    }

    setDialogOpen(false);
    setEditingSetting(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">
          System management and detailed overview.
        </p>
      </div>

      <SettingsSearchBar
        search={search}
        onSearchChange={setSearch}
        onAdd={() => {
          setEditingSetting(null);
          setDialogOpen(true);
        }}
      />

      <SettingsTable
        settings={filteredSettings}
        onEdit={(s) => {
          setEditingSetting(s);
          setDialogOpen(true);
        }}
        onDelete={handleDelete}
      />

      <SettingsFormDialog
        open={dialogOpen}
        setting={editingSetting}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
