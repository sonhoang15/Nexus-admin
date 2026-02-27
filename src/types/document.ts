export interface IDocumentOwner {
  id: string;
  fullName: string;
  email: string;
}

export interface IDocument {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileSizeFormatted: string;

  fileUrl: string;
  previewUrl: string;
  downloadUrl: string;

  owner: IDocumentOwner;

  createdAt: string;
  updatedAt?: string;
}

export interface IDocumentFromBE {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileSizeFormatted: string;
  fileUrl: string;
  previewUrl: string;
  downloadUrl: string;
  owner: {
    id: string;
    fullName: string;
    email: string;
  };
  createdAt: string;
}

export interface ICreateDocumentDto {
  file: File;
  title?: string;
}

export interface IPaginatedResponse<T> {
  items: T[];
  meta?: any;
}

export interface IDocumentPayload {
  title?: string;
  file: File;
}
