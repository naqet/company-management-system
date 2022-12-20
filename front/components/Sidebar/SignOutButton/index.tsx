"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLoader, FiLogOut } from "react-icons/fi";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signout", { method: "POST" });

      if (400 <= response.status && response.status < 600) {
        const errorText = await response.text();
        throw new Error(errorText ?? response.statusText);
      }

      if (response.redirected) {
        router.push(response.url);
        return;
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) {
        setError(e.message);
        setTimeout(() => {
          setError(undefined);
        }, 5000);
      } else if (typeof e === "string") {
        setError(e);
        setTimeout(() => {
          setError(undefined);
        }, 5000);
      }
    }
  };

  return (
    <button
      type="button"
      title="Sign out"
      className="border-hover text-hover rounded-lg text-2xl block py-2 px-8 dark:bg-slate-800 relative disabled:opacity-50"
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? <FiLoader className="animate-spin" /> : <FiLogOut />}
      <span
        data-visible={!!error}
        className="whitespace-nowrap absolute -top-8 left-2 text-xs dark:text-red-400 overflow-hidden max-h-0 data-[visible=true]:max-h-4 data-[visible=true]:mt-1 transition-all"
      >
        {error}
      </span>
    </button>
  );
}
