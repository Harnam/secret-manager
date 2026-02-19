import { Note } from "@/Types/Note";

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