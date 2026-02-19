import { DecryptedNote, Note } from "@/Types/Note"

export const decryptData = async (note: Note, password: string): Promise<DecryptedNote> => {
    return new Promise((resolve, reject) => {
        resolve({
            id: note.id,
            title: note.title,
            content: note.encryptedData,
            createdAt: note.createdAt
        });
    });
}