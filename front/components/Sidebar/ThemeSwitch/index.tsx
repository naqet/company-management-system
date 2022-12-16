"use client";

import { useEffect, useState } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeSwitch() {
  const [lightMode, setLightMode] = useState<boolean | undefined>(undefined);
  const loading = typeof lightMode === "undefined";

  useEffect(() => {
    if (typeof document === "undefined") return;

    setLightMode(
      !!document.cookie.match(/^(.*;)?\s*lightMode\s*=\s*[^;]+(.*)?$/)
    );
  }, []);

  const handleThemeSwitch = () => {
    if (typeof document === "undefined") return;

    if (lightMode) {
      document.cookie = "lightMode=false; max-age=-1";
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.cookie = "lightMode=true";
    }
    setLightMode((prevState) => !prevState);
  };

  return (
    <button
      type="button"
      title="Switch dark mode"
      disabled={loading}
      className="border-hover text-hover rounded-lg text-2xl block py-2 px-8 dark:bg-slate-800 disabled:opacity-80"
      onClick={handleThemeSwitch}
    >
      {loading ? <BiDotsHorizontal /> : lightMode ? <FiMoon /> : <FiSun />}
    </button>
  );
}
