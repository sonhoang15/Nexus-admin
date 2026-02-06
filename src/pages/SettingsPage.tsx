import { useSettings } from "@/hooks/useSettings";
import { SettingsSearchBar } from "@/components/system/settings/SettingsSearchBar";
import { SettingsTable } from "@/components/system/settings/SettingsTable";
import { SettingsForm } from "@/components/system/settings/SettingsForm";

export default function SettingsPage() {
  const {
    settings,
    search,
    viewMode,
    editingSetting,
    setSearch,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
  } = useSettings();

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
        onAdd={handleAdd}
      />

      {viewMode === "table" && (
        <SettingsTable
          settings={settings}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {viewMode === "form" && (
        <SettingsForm
          setting={editingSetting}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
