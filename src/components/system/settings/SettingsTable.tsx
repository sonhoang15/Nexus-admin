import { TSetting } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Terminal } from "lucide-react";

interface Props {
  settings: TSetting[];
  onEdit: (setting: TSetting) => void;
  onDelete: (id: string) => void;
}

export function SettingsTable({ settings, onEdit, onDelete }: Props) {
  return (
    <div className="bg-card rounded-lg border overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="p-4 text-sm text-muted-foreground">KEY</th>
            <th className="p-4 text-sm text-muted-foreground">DESCRIPTION</th>
            <th className="p-4 text-sm text-muted-foreground text-right">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {settings.map((s) => (
            <tr key={s.id} className="border-b last:border-0">
              <td className="p-4 font-mono text-sm flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                {s.configKey}
              </td>
              <td className="p-4 text-muted-foreground">{s.description}</td>
              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(s)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(s.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {settings.length === 0 && (
            <tr>
              <td colSpan={3} className="p-8 text-center text-muted-foreground">
                No settings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
