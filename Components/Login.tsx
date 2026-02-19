"use client";

import { useState } from "react";

export default function Login({ onUnlock }: {
  onUnlock: (password: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-xl mb-4">Enter Master Password</h1>

        <input
          type="password"
          className="border p-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="block mt-4 bg-blue-500 text-white px-4 py-2"
          onClick={() => onUnlock(password)}
        >
          Unlock
        </button>
      </div>
    </div>
  );
}