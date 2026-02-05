import { TPage } from "@/types";
import {
  ExternalLink,
  Pencil,
  Trash2,
  FileCode,
  Calendar,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";

type Props = {
  pages: TPage[];
  onEdit: (page: TPage) => void;
  onDelete: (id: string) => void;
};

export function ContentsTable({ pages, onEdit, onDelete }: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b text-left">
          <th className="p-4 text-sm text-muted-foreground">PAGE CONTENT</th>
          <th className="p-4 text-sm text-muted-foreground">STATUS</th>
          <th className="p-4 text-sm text-muted-foreground">HISTORY</th>
          <th className="p-4 text-sm text-muted-foreground text-right">
            ACTIONS
          </th>
        </tr>
      </thead>
      <tbody>
        {pages.map((page) => (
          <tr key={page.id} className="border-b last:border-0">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <FileCode className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{page.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    /pages/{page.slug}
                  </p>
                </div>
              </div>
            </td>

            <td className="p-4">
              <Badge
                className={cn(
                  page.status === "PUBLISHED"
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground",
                )}
              >
                ● {page.status}
              </Badge>
            </td>

            <td className="p-4 text-xs text-muted-foreground space-y-1">
              <p className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                CREATED: {page.createdAt}
              </p>
              <p className="flex items-center gap-1">
                <Pencil className="h-3 w-3" />
                UPDATED: {page.updatedAt}
              </p>
            </td>

            <td className="p-4">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(page)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(page.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </td>
          </tr>
        ))}

        {pages.length === 0 && (
          <tr>
            <td colSpan={4} className="p-8 text-center text-muted-foreground">
              No pages found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
