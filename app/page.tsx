"use client";

import Login from "@/Components/Login";
import NotesApp from "@/Components/NotesApp";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User|null>(null);

  if (!user)
    return (<Login onUnlock={setUser} />);
  
  return (<NotesApp user={user} />);

}
