import { getNotesForUser } from "@/lib/storage";
import { Note } from "@/Types/Note";
import { useEffect, useState } from "react";

export default function NotesList({ id, onSelect }: {
  id: string;
  onSelect: (note: Note | null) => void;
}) {

    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        getNotesForUser(id).then(setNotes);
    }, [id]);

    return (
    <div className="w-1/3 border-r p-4">

        <button
        // onClick={deleteNote} //to be implemented
        className="bg-blue-500 text-white px-4 py-2"
        onClick={() => onSelect(null)}
        >
        New Note
        </button>

      {notes.map(note => (
        <div
          key={note.id}
          onClick={() => onSelect(note)}
          className="cursor-pointer p-2 hover:bg-gray-100"
        >
          {note.title}
        </div>
      ))}
    </div>
  );
}