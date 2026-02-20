import { DecryptedNote, Note } from "@/Types/Note"

const encoder = new TextEncoder();

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

async function getKeyFromPassword(password: string, salt: ArrayBuffer) {
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

export const decryptData = async (note: Note, password: string): Promise<DecryptedNote> => {
    const salt = base64ToArrayBuffer(note.salt);
    const iv = base64ToArrayBuffer(note.iv);
    const encryptedData = base64ToArrayBuffer(note.encryptedData);

    const key = await getKeyFromPassword(password, salt);

    const decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv,
        },
        key,
        encryptedData
    );
    return new Promise((resolve, reject) => {
        resolve({
            id: note.id,
            title: note.title,
            content: new TextDecoder().decode(decryptedData),
            createdAt: note.createdAt
        });
    });
}

export const encryptData = async (dec: DecryptedNote, password: string): Promise<Note> => {

    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const key = await getKeyFromPassword(password, salt.buffer);

    const encryptedData = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv,
        },
        key,
        encoder.encode(dec.content)
    );

    return new Promise((resolve, reject) => {
        resolve({
            id: dec.id || crypto.randomUUID(),
            title: dec.title,
            encryptedData: arrayBufferToBase64(encryptedData),
            salt: arrayBufferToBase64(salt.buffer),
            iv: arrayBufferToBase64(iv.buffer),
            createdAt: dec.createdAt || Date.now()
        });
    });
}