"use client";

import { useState } from "react";
import { LoginOrSignUp } from "@/lib/login";

export default function Login({ onUnlock }: {
  onUnlock: (user: UserLogin) => void;
}) {
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  function login() {
    LoginOrSignUp({ id, password }).then((result) => {
      console.log("Login result:", result);
      if (result.status === "success") {
        onUnlock(result.user!);
      } else {
        alert(result.error);
      }
    }).catch((error) => {
      alert(error.error);
    });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-xl mb-4">Enter User ID</h1>

        <input
          name = "id"
          type="text"
          className="border p-2"
          value={id}
          onChange={e => setId(e.target.value)}
        />

        <br />

        <h1 className="text-xl mb-4">Enter Master Password</h1>

        <input
          name = "password"
          type="password"
          className="border p-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="block mt-4 bg-blue-500 text-white px-4 py-2"
          onClick={() => login()}
        >
          Unlock
        </button>
      </div>
    </div>
  );
}