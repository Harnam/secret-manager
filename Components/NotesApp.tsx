import NoteEdit from "@/Components/NoteEdit";
import NotesList from "@/Components/NotesList";
import { getNotesForUser } from "@/lib/storage";
import { Note } from "@/Types/Note";
import { useEffect, useState } from "react";

export default function NotesApp({ user }: {
  user: UserLogin;
}) {

    const [notes, setNotes] = useState<Note[]>([]);
    const [reloadFlag, setReloadFlag] = useState(false);

    const triggerReload = () => {
        setReloadFlag(!reloadFlag);
        setSelectedNote(null);
    };

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    useEffect(() => {
        async function loadNotes() {
            getNotesForUser(user.id).then(fetchedNotes => {
                setNotes(fetchedNotes);
            }).catch(err => {
                alert("Failed to load notes: " + err);
            });
            setSelectedNote(null);
        }
        loadNotes();
    }, [user, reloadFlag]);

    return (
    <div className="flex h-screen">

      <NotesList
        notes={notes}
        onSelect={setSelectedNote}
      />

      <NoteEdit
        userId={user.id}
        password={user.password}
        note={selectedNote}
        triggerReload={triggerReload}
      />

    </div>
    );
}