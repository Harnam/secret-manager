import NoteEdit from "@/Components/NoteEdit";
import NotesList from "@/Components/NotesList";

export default function NotesApp({ user }: {
  user: User;
}) {
    return (
        <>
            <NotesList />
            <NoteEdit />
        </>
    );
}