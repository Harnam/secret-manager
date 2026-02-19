import NoteEdit from "@/Components/NoteEdit";
import NotesList from "@/Components/NotesList";
import { Note } from "@/Types/Note";
import { useState } from "react";

export default function NotesApp({ user }: {
  user: User;
}) {

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    return (
    <div className="flex h-screen">

      <NotesList
        id={user.id}
        onSelect={setSelectedNote}
      />

      <NoteEdit
        password={user.password}
        note={selectedNote}
      />

    </div>
    );
}