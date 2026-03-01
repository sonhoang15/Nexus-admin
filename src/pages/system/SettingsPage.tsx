import { useSettings } from "@/hooks/useSettings";
import { SettingsSearchBar } from "@/components/system/settings/SettingsSearchBar";
import { SettingsTable } from "@/components/system/settings/SettingsTable";
import { SettingsForm } from "@/components/system/settings/SettingsForm";
import { ConfirmDeleteModal } from "@/components/common/ConfirmDeleteModal";

export default function SettingsPage() {
  const {
    settings,
    search,
    viewMode,
    editingSetting,
    loading,
    submitting,
    deletingId,
    confirmDeleteId,

    setSearch,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
    confirmDelete,
    cancelDelete,
  } = useSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">
          System management and detailed overview.
        </p>
      </div>
      {loading && (
        <div className="p-6 text-center text-muted-foreground">
          Loading settings...
        </div>
      )}

      <SettingsSearchBar
        search={search}
        onSearchChange={setSearch}
        onAdd={handleAdd}
      />

      {!loading && viewMode === "table" && (
        <SettingsTable
          settings={settings}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}
      {viewMode === "form" && (
        <SettingsForm
          setting={editingSetting}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}

      <ConfirmDeleteModal
        open={!!confirmDeleteId}
        loading={!!deletingId}
        entityName="setting"
        itemName={settings.find((s) => s.id === confirmDeleteId)?.configKey}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
