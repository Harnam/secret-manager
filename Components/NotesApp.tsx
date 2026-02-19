import NoteEdit from "@/Components/NoteEdit";
import NotesList from "@/Components/NotesList";

export default function NotesApp({ password }: {
  password: string;
}) {
    return (
        <>
            <NotesList />
            <NoteEdit />
        </>
    );
}