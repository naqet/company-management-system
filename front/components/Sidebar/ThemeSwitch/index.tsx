"use client";

import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeSwitch() {
  const [lightMode, setLightMode] = useState(
    document && !!document.cookie.match(/^(.*;)?\s*lightMode\s*=\s*[^;]+(.*)?$/)
  );

  const handleThemeSwitch = () => {
    if (!document) return;

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
      className="border-hover text-hover rounded-lg text-2xl block py-2 px-8 dark:bg-slate-800"
      onClick={handleThemeSwitch}
    >
      {lightMode ? <FiMoon /> : <FiSun />}
    </button>
  );
}
