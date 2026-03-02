import { useEffect, useState } from "react";
import {
  getSettingsService,
  createSettingService,
  updateSettingService,
  deleteSettingService,
} from "@/services/setting.Service";
import { ISetting, CreateSettingDto, IUpdateSettingDto } from "@/types";

type ViewMode = "table" | "form";

export function useSettings() {
  const [settings, setSettings] = useState<ISetting[]>([]);
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editingSetting, setEditingSetting] = useState<ISetting | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await getSettingsService();
      setSettings(res.data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const filteredSettings = settings.filter((s) => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return true;

    return [s.configKey, s.description]
      .filter(Boolean)
      .some((field) => field!.toLowerCase().includes(keyword));
  });

  const handleAdd = () => {
    setEditingSetting(null);
    setViewMode("form");
  };

  const handleEdit = (setting: ISetting) => {
    setEditingSetting(setting);
    setViewMode("form");
  };

  const handleDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      setDeletingId(confirmDeleteId); // row loading

      await deleteSettingService(confirmDeleteId);

      setSettings((prev) => prev.filter((s) => s.id !== confirmDeleteId));

      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleSubmit = async (
    payload: CreateSettingDto | IUpdateSettingDto,
  ) => {
    try {
      setSubmitting(true);

      if (editingSetting) {
        const updated = await updateSettingService(editingSetting.id, payload);

        setSettings((prev) =>
          prev.map((s) => (s.id === updated.data.id ? updated.data : s)),
        );
      } else {
        const created = await createSettingService(payload as CreateSettingDto);

        setSettings((prev) => [created.data, ...prev]);
      }

      setEditingSetting(null);
      setViewMode("table");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditingSetting(null);
    setViewMode("table");
  };

  return {
    settings: filteredSettings,
    loading,
    submitting,
    deletingId,
    search,
    viewMode,
    editingSetting,
    confirmDeleteId,

    setSearch,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCancel,
    confirmDelete,
    cancelDelete,
  };
}
