import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { UploadIcon } from "lucide-react";
import { API_BASE } from "@/utils/productHelpers";

export type ImageItem =
  | {
      type: "old";
      id: string;
      url: string;
    }
  | {
      type: "new";
      file: File;
    };

type Props = {
  images: ImageItem[];
  setImages: (images: ImageItem[]) => void;
  errors?: { images?: string };
  onRemoveImage: (image: ImageItem) => void;
};

export function MediaStep({ images, setImages, errors, onRemoveImage }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray: ImageItem[] = Array.from(files).map((file) => ({
      type: "new",
      file,
    }));

    setImages([...images, ...fileArray]);
  };

  const getImageSrc = (image: ImageItem) => {
    if (image.type === "old") {
      const src = `${API_BASE}${image.url}`;
      return src;
    }
    return URL.createObjectURL(image.file);
  };

  return (
    <div className="space-y-6">
      {images.length === 0 && (
        <div
          onClick={() => inputRef.current?.click()}
          className="border border-dashed border-red-300 rounded-xl p-16 text-center text-red-500 cursor-pointer hover:bg-red-50 transition"
        >
          <div className="text-3xl flex items-center justify-center">
            <UploadIcon />
          </div>
          <div className="font-semibold mt-2">Upload Product Images</div>
          <div className="text-sm">
            Minimum 1 high-resolution image required
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="flex gap-6 flex-wrap">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-64 h-64 rounded-2xl overflow-hidden border"
            >
              <img
                src={getImageSrc(image)}
                alt="preview"
                className="w-full h-full object-cover"
              />

              {index === 0 && (
                <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                  MAIN PHOTO
                </span>
              )}

              <button
                type="button"
                onClick={() => onRemoveImage(image)}
                className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div
            onClick={() => inputRef.current?.click()}
            className="w-64 h-64 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="text-3xl">+</div>
            <div className="mt-2 font-medium">Add Image</div>
          </div>
        </div>
      )}

      <Input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {errors?.images && (
        <p className="text-xs text-red-500 text-center">{errors.images}</p>
      )}
    </div>
  );
}
