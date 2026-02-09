export interface IDocument {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  size: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateDocumentDto {
  file: File;
  title?: string;
}
