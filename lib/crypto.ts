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

export const encryptData = async (dec: DecryptedNote, password: string): Promise<Note> => {
    return new Promise((resolve, reject) => {
        resolve({
            id: dec.id || crypto.randomUUID(),
            title: dec.title,
            encryptedData: dec.content,
            salt: "default-salt", // In a real app, this would be generated securely
            iv: "default-iv", // In a real app, this would be generated securely
            createdAt: dec.createdAt || Date.now()
        });
    });
}