import { DecryptedNote, Note } from "@/Types/Note";
import { encryptData } from "./crypto";

export function getNotesForUser(userId: string): Promise<Note[]> {
    return new Promise((resolve) => {
        const notes = localStorage.getItem("notes" + userId);
        if (notes) {
            resolve(JSON.parse(notes) as Note[]);
        } else {
            resolve([]);
        }
    });
}

export function saveNoteForUser(userId: string, dec: DecryptedNote, password: string): Promise<void> {
    return new Promise((resolve) => {
        encryptData(dec, password).then(encryptedNote => {
            getNotesForUser(userId).then(notes => {
                notes.push(encryptedNote);
                localStorage.setItem("notes" + userId, JSON.stringify(notes));
                resolve();
            });
        });
    });
}

export function deleteNoteForUser(userId: string, noteId: string): Promise<void> {
    return new Promise((resolve) => {
        getNotesForUser(userId).then(notes => {
            const updatedNotes = notes.filter(note => note.id !== noteId);
            localStorage.setItem("notes" + userId, JSON.stringify(updatedNotes));
            resolve();
        });
    })
};

export function updateNoteForUser(userId: string, dec: DecryptedNote, password: string): Promise<void> {
    return new Promise((resolve) => {
        encryptData(dec, password).then(encryptedNote => {
            getNotesForUser(userId).then(notes => {
                const updatedNotes = notes.map(note => note.id === encryptedNote.id ? encryptedNote : note);
                localStorage.setItem("notes" + userId, JSON.stringify(updatedNotes));
                resolve();
            });
        });
    })
};