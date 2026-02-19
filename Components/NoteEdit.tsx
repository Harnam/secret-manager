import { decryptData } from "@/lib/crypto";
import { deleteNoteForUser, saveNoteForUser, updateNoteForUser } from "@/lib/storage";
import { DecryptedNote, Note } from "@/Types/Note";
import { useEffect, useState } from "react";

export default function NoteEdit({ userId, password, note, triggerReload }: {
  userId: string;
  password: string;
  note: Note | null;
  triggerReload: () => void;
}) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {

        async function loadNote() {

            if (!note) {
                setTitle("");
                setContent("");
                return;
            }
            decryptData(note, password).then(decrypted => {
                    setTitle(decrypted.title);
                    setContent(decrypted.content);
                }).catch(err => {
                    alert("Failed to decrypt note: " + err);
                    setTitle("");
                    setContent("");
                });

        }

        loadNote();
    }, [note, password]);

    const saveNote = () => {
        const dec: DecryptedNote = {
            title,
            content,
        };
        saveNoteForUser(userId, dec, password).then(() => {
            setTitle("");
            setContent("");
            triggerReload();
        });
    };

    const deleteNote = () => {
        if (!note) return;
        deleteNoteForUser(userId, note.id).then(() => {
            triggerReload();
        });
    };

    const editNote = () => {
        if (!note) return;
        const dec: DecryptedNote = {
            id: note.id,
            title,
            content,
            createdAt: note.createdAt
        };
        updateNoteForUser(userId, dec, password).then(() => {
            triggerReload();
        });
    };

    return (
         <div className="flex-1 p-4">

      <input
        name="title"
        className="block w-full border p-2 mb-2"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        name="content"
        className="block w-full border p-2 mb-2"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button
        onClick={!note ? saveNote : editNote}
        className="bg-green-500 text-white px-4 py-2"
      >
        {!note ? "Create Note" : "Edit Note"}
      </button>
      <button
        onClick={deleteNote}
        className="bg-red-500 text-white px-4 py-2"
        disabled={!note}
      >
        Delete
      </button>

    </div>
    );
}