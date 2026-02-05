export interface TDocument {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  size: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface TCreateDocumentDto {
  file: File;
  title?: string;
}
