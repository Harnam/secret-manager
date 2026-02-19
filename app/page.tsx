"use client";

import Login from "@/Components/Login";
import NotesApp from "@/Components/NotesApp";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");

  if (!password)
    return (<Login onUnlock={setPassword} />);
  
  return (<NotesApp password={password} />);

}
