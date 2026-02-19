import { decryptData } from "@/lib/crypto";
import { Note } from "@/Types/Note";
import { useEffect, useState } from "react";

export default function NoteEdit({ password, note }: {
  password: string;
  note: Note | null;
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
        // onClick={saveNote} //to be implemented
        className="bg-green-500 text-white px-4 py-2"
      >
        {!note ? "Create Note" : "Edit Note"}
      </button>
      <button
        // onClick={deleteNote} //to be implemented
        className="bg-red-500 text-white px-4 py-2"
        disabled={!note}
      >
        Delete
      </button>

    </div>
    );
}