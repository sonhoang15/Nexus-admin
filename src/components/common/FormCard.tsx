import { ReactNode, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  icon?: ReactNode;
  title: string;
  submitLabel?: string;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
};

export function FormCard({ icon, title, onClose, onSubmit, children }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-2xl shadow-xl max-w-xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                {icon}
              </div>
            )}
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          </div>

          <Button
            type="button"
            onClick={onClose}
            className="text-white hover:text-black !bg-red-500"
          >
            ✕
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </form>
  );
}
