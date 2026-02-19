export interface Note {
  id: string;
  title: string;
  encryptedData: string;
  salt: string;
  iv: string;
  createdAt: number;
}

export type DecryptedNote = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
};