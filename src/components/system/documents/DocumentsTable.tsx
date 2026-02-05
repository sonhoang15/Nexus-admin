import { TDocument } from "@/types";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Download, File, FileText } from "lucide-react";

interface Props {
  documents: TDocument[];
  onDelete: (id: string) => void;
}

const getFileIcon = (fileType: string) => {
  switch (fileType.toUpperCase()) {
    case "PDF":
      return <FileText className="h-5 w-5 text-destructive" />;
    case "DOC":
    case "DOCX":
      return <File className="h-5 w-5 text-primary" />;
    default:
      return <File className="h-5 w-5 text-muted-foreground" />;
  }
};

export function DocumentsTable({ documents, onDelete }: Props) {
  return (
    <div className="bg-card rounded-lg border overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="p-4 text-sm text-muted-foreground">DOCUMENT NAME</th>
            <th className="p-4 text-sm text-muted-foreground">SIZE</th>
            <th className="p-4 text-sm text-muted-foreground">OWNER</th>
            <th className="p-4 text-sm text-muted-foreground">UPDATED AT</th>
            <th className="p-4 text-sm text-muted-foreground text-right">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-b last:border-0">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    {getFileIcon(doc.fileType)}
                  </div>
                  <div>
                    <p className="font-medium">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.fileType} File
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-muted-foreground">{doc.size}</td>
              <td className="p-4 text-muted-foreground">{doc.owner}</td>
              <td className="p-4 text-muted-foreground">{doc.updatedAt}</td>
              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {documents.length === 0 && (
            <tr>
              <td colSpan={5} className="p-8 text-center text-muted-foreground">
                No documents uploaded yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
