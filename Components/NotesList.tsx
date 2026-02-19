import { Note } from "@/Types/Note";

export default function NotesList({ notes, onSelect }: {
  notes: Note[];
  onSelect: (note: Note | null) => void;
}) {

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