import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { IPage } from "@/types";
import { Badge } from "@/components/ui/badge";

interface IContentStatusProps {
  pages: IPage[];
  onNewPage: () => void;
}

export function ContentStatus({ pages, onNewPage }: IContentStatusProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Content Status</CardTitle>
          <CardDescription>
            Recently modified CMS pages and drafts.
          </CardDescription>
        </div>
        <Button
          size="sm"
          onClick={onNewPage}
          className="bg-yellow-500 text-white hover:bg-yellow-600"
        >
          <Plus className="h-4 w-4 mr-1" />
          NEW PAGE
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pages.map((page) => (
            <div key={page.id} className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-muted">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{page.title}</p>
                <p className="text-xs text-muted-foreground">
                  Modified: {page.updatedAt}
                </p>
              </div>
              <Badge
                variant={page.status === "PUBLISHED" ? "default" : "secondary"}
                className={
                  page.status === "PUBLISHED"
                    ? "bg-success text-success-foreground hover:bg-success/90"
                    : ""
                }
              >
                {page.status}
              </Badge>
            </div>
          ))}
          {pages.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No pages yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
