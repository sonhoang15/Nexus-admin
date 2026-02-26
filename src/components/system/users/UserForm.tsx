import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LucideKey } from "lucide-react";

import { IUser } from "@/types/user";
import { FormCard } from "@/components/common/FormCard";
import { FormField } from "@/components/common/FormField";
import { FormActions } from "@/components/common/FormActions";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  role: "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "INACTIVE";
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type Props = {
  editingUser: IUser | null;
  formData: FormData;
  onChange: (data: FormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function UserForm({
  editingUser,
  formData,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Invalid email format";
    }

    if (!editingUser && !formData.password.trim()) {
      nextErrors.password = "Password is required";
    }

    if (formData.password && formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const autoGeneratePassword = () => {
    const pwd = Math.random().toString(36).slice(-10);
    onChange({ ...formData, password: pwd });
    setShowPassword(true);
    setErrors((e) => ({ ...e, password: undefined }));
  };

  return (
    <FormCard
      icon={<LucideKey className="h-6 w-6" />}
      title={editingUser ? "Edit User" : "Create New User"}
      submitLabel={editingUser ? "Update User" : "Register User"}
      onClose={onCancel}
      onSubmit={() => {
        if (validate()) onSubmit();
      }}
    >
      <FormField label="Full Name" error={errors.fullName}>
        <Input
          placeholder="e.g. John Doe"
          value={formData.fullName}
          className="rounded-xl h-11"
          onChange={(e) => {
            onChange({ ...formData, fullName: e.target.value });
            setErrors((er) => ({ ...er, fullName: undefined }));
          }}
        />
      </FormField>

      <FormField label="Email Address" error={errors.email}>
        <Input
          type="email"
          placeholder="john@nexus.com"
          value={formData.email}
          className="rounded-xl h-11"
          onChange={(e) => {
            onChange({ ...formData, email: e.target.value });
            setErrors((er) => ({ ...er, email: undefined }));
          }}
        />
      </FormField>

      <FormField label="Password" error={errors.password}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={formData.password}
              className="rounded-xl h-11 pr-10"
              onChange={(e) => {
                onChange({ ...formData, password: e.target.value });
                setErrors((er) => ({ ...er, password: undefined }));
              }}
            />

            <Button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:!none !bg-inherit"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-xl px-4 !bg-yellow-500 hover:!bg-yellow-600 text-white"
            onClick={autoGeneratePassword}
          >
            Auto-Gen
          </Button>
        </div>
      </FormField>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <FormField label="Role">
          <Select
            value={formData.role}
            onValueChange={(v: "ADMIN" | "SUPER_ADMIN") =>
              onChange({ ...formData, role: v })
            }
          >
            <SelectTrigger className="rounded-xl h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Status">
          <Select
            value={formData.status}
            onValueChange={(v: "ACTIVE" | "INACTIVE") =>
              onChange({ ...formData, status: v })
            }
          >
            <SelectTrigger className="rounded-xl h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormActions
        submitText={editingUser ? "Update User" : "Register User"}
        isDisabled={Object.keys(errors).length > 0}
        onCancel={onCancel}
        CancelText="Discard"
        onSubmit={onSubmit}
      />
    </FormCard>
  );
}
