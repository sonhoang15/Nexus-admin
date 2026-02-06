import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface Props {
  onUpload: () => void;
}

export function DocumentsHeader({ onUpload }: Props) {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Document Management</h1>
        <p className="text-muted-foreground">
          System management and detailed overview.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recent Documents</h2>
        <Button
          onClick={onUpload}
          className="bg-blue-500 text-white hover:bg-blue-700"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload New
        </Button>
      </div>
    </>
  );
}
